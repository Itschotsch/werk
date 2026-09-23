import crypto from 'node:crypto';
import { promisify } from 'node:util';
import type { Types } from 'mongoose';
import { User, type IUser } from '../models/User.js';
import { Session, type ISession } from '../models/Session.js';

const scryptAsync = promisify(crypto.scrypt);

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export function hashToken(rawToken: string): string {
	return crypto.createHash('sha256').update(rawToken).digest('hex');
}

export async function hashPassword(password: string): Promise<string> {
	const salt = crypto.randomBytes(16).toString('hex');
	const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
	return `scrypt$${salt}$${derivedKey.toString('hex')}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
	try {
		const parts = storedHash.split('$');
		if (parts.length !== 3 || parts[0] !== 'scrypt') {
			return false;
		}
		const salt = parts[1];
		const keyHex = parts[2];
		if (!salt || !keyHex) {
			return false;
		}
		const expectedKey = Buffer.from(keyHex, 'hex');
		const actualKey = (await scryptAsync(password, salt, 64)) as Buffer;

		if (expectedKey.length !== actualKey.length) {
			return false;
		}
		return crypto.timingSafeEqual(expectedKey, actualKey);
	} catch {
		return false;
	}
}

export async function createSession(
	userId: Types.ObjectId,
	userAgent?: string,
	ip?: string
): Promise<{ token: string; expiresAt: Date }> {
	const rawToken = crypto.randomBytes(32).toString('hex');
	const tokenHash = hashToken(rawToken);
	const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

	const sessionDoc: {
		tokenHash: string;
		userId: Types.ObjectId;
		expiresAt: Date;
		userAgent?: string;
		ip?: string;
	} = {
		tokenHash,
		userId,
		expiresAt
	};

	if (userAgent) {
		sessionDoc.userAgent = userAgent;
	}
	if (ip) {
		sessionDoc.ip = ip;
	}

	await Session.create(sessionDoc);

	return { token: rawToken, expiresAt };
}

export async function validateSession(
	rawToken: string
): Promise<{ user: IUser; session: ISession } | null> {
	if (!rawToken || typeof rawToken !== 'string') {
		return null;
	}

	const tokenHash = hashToken(rawToken);
	const session = await Session.findOne({
		tokenHash,
		expiresAt: { $gt: new Date() }
	});

	if (!session) {
		return null;
	}

	const user = await User.findById(session.userId);
	if (!user) {
		await Session.deleteOne({ _id: session._id });
		return null;
	}

	return { user, session };
}

export async function revokeSession(rawToken: string): Promise<boolean> {
	if (!rawToken || typeof rawToken !== 'string') {
		return false;
	}
	const tokenHash = hashToken(rawToken);
	const result = await Session.deleteOne({ tokenHash });
	return result.deletedCount > 0;
}
