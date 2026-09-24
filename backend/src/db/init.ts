import type mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Session } from '../models/Session.js';

export async function ensureUserIntegrity(): Promise<void> {
	// Find users with missing or empty username, email, or displayName
	const problematicUsers = await User.find({
		$or: [
			{ username: { $exists: false } },
			{ username: null },
			{ username: '' },
			{ email: { $exists: false } },
			{ email: null },
			{ email: '' },
			{ displayName: { $exists: false } },
			{ displayName: null },
			{ displayName: '' }
		]
	});

	for (const user of problematicUsers) {
		let updated = false;

		// 1. Ensure email is non-null and non-empty
		if (!user.email || user.email.trim() === '') {
			user.email = `user_${user._id.toString()}@werk.local`;
			updated = true;
		}

		// 2. Ensure username is non-null and non-empty
		if (!user.username || user.username.trim() === '') {
			let candidate = user.email ? user.email.split('@')[0] : '';
			candidate = (candidate || '')
				.toLowerCase()
				.replace(/[^a-z0-9_-]/g, '_')
				.trim();
			if (!candidate || candidate.length < 3) {
				candidate = `user_${user._id.toString().slice(-6)}`;
			}

			// Ensure unique username
			let uniqueUsername = candidate;
			let counter = 1;
			while (await User.exists({ username: uniqueUsername, _id: { $ne: user._id } })) {
				uniqueUsername = `${candidate}_${counter}`;
				counter++;
			}

			user.username = uniqueUsername;
			updated = true;
		}

		// 3. Ensure displayName is non-null and non-empty
		if (!user.displayName || user.displayName.trim() === '') {
			user.displayName = user.username || 'User';
			updated = true;
		}

		if (updated) {
			await user.save();
			console.log(
				`[Database Integrity] Repaired user record (${user._id}): username="${user.username}", email="${user.email}", displayName="${user.displayName}"`
			);
		}
	}
}

export async function initDatabase(connection: mongoose.Connection): Promise<void> {
	const db = connection.db;
	if (!db) {
		throw new Error('Cannot initialize database: connection.db is undefined');
	}

	const existingCollections = await db.listCollections().toArray();
	const collectionNames = new Set(existingCollections.map((col) => col.name));

	// Programmatically create 'users' collection if it does not exist
	if (!collectionNames.has('users')) {
		await db.createCollection('users');
		console.log('[Database] Programmatically created collection: users');
	} else {
		console.log('[Database] Verified collection exists: users');
	}

	// Programmatically create 'sessions' collection if it does not exist
	if (!collectionNames.has('sessions')) {
		await db.createCollection('sessions');
		console.log('[Database] Programmatically created collection: sessions');
	} else {
		console.log('[Database] Verified collection exists: sessions');
	}

	// Ensure indexes (unique email, unique username, unique tokenHash, TTL index)
	await Promise.all([User.init(), Session.init()]);
	console.log('[Database] Verified indexes for users and sessions');

	// Auto-repair missing fields (username, email, displayName) across all existing users
	await ensureUserIntegrity();
}
