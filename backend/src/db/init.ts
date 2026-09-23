import type mongoose from 'mongoose';
import { User } from '../models/User.js';
import { Session } from '../models/Session.js';

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
}
