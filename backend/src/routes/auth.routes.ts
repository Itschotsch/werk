import type { FastifyPluginAsync } from 'fastify';
import { User } from '../models/User.js';
import {
	hashPassword,
	verifyPassword,
	createSession,
	validateSession,
	revokeSession
} from '../services/auth.service.js';

interface RegisterBody {
	email?: string;
	username?: string;
	displayName?: string;
	password?: string;
}

interface LoginBody {
	identifier?: string;
	password?: string;
}

export const authRoutes: FastifyPluginAsync = async (app) => {
	// POST /api/auth/register
	app.post<{ Body: RegisterBody }>('/register', async (request, reply) => {
		const { email, username, displayName, password } = request.body || {};

		if (!email || typeof email !== 'string' || !email.includes('@')) {
			return reply.status(400).send({
				error: 'INVALID_EMAIL',
				message: 'A valid email address is required'
			});
		}

		const cleanUsername = username?.trim().toLowerCase();
		if (
			!cleanUsername ||
			typeof cleanUsername !== 'string' ||
			cleanUsername.length < 3 ||
			cleanUsername.length > 30 ||
			!/^[a-z0-9_-]+$/.test(cleanUsername)
		) {
			return reply.status(400).send({
				error: 'INVALID_USERNAME',
				message:
					'Username must be 3-30 characters and contain only letters, numbers, underscores, or hyphens'
			});
		}

		const cleanDisplayName = displayName?.trim();
		if (!cleanDisplayName || typeof cleanDisplayName !== 'string' || cleanDisplayName.length > 50) {
			return reply.status(400).send({
				error: 'INVALID_DISPLAY_NAME',
				message: 'Display name is required (max 50 characters)'
			});
		}

		if (!password || typeof password !== 'string' || password.length < 8) {
			return reply.status(400).send({
				error: 'INVALID_PASSWORD',
				message: 'Password must be at least 8 characters long'
			});
		}

		const cleanEmail = email.trim().toLowerCase();

		// Check for existing email
		const existingEmail = await User.findOne({ email: cleanEmail });
		if (existingEmail) {
			return reply.status(409).send({
				error: 'EMAIL_IN_USE',
				message: 'Email address is already in use'
			});
		}

		// Check for existing username
		const existingUsername = await User.findOne({ username: cleanUsername });
		if (existingUsername) {
			return reply.status(409).send({
				error: 'USERNAME_IN_USE',
				message: 'Username is already taken'
			});
		}

		const passwordHash = await hashPassword(password);

		const user = await User.create({
			email: cleanEmail,
			username: cleanUsername,
			displayName: cleanDisplayName,
			passwordHash,
			authProviders: ['password']
		});

		const userAgent = request.headers['user-agent'];
		const ip = request.ip;
		const session = await createSession(user._id, userAgent, ip);

		return reply.status(201).send({
			user: {
				id: user._id.toString(),
				email: user.email,
				username: user.username,
				displayName: user.displayName
			},
			token: session.token,
			expiresAt: session.expiresAt.toISOString()
		});
	});

	// POST /api/auth/login
	app.post<{ Body: LoginBody }>('/login', async (request, reply) => {
		const { identifier, password } = request.body || {};

		if (
			!identifier ||
			typeof identifier !== 'string' ||
			!password ||
			typeof password !== 'string'
		) {
			return reply.status(400).send({
				error: 'INVALID_INPUT',
				message: 'Identifier and password are required'
			});
		}

		const cleanIdentifier = identifier.trim().toLowerCase();

		const user = await User.findOne({
			$or: [{ email: cleanIdentifier }, { username: cleanIdentifier }]
		});

		if (!user || !user.passwordHash) {
			return reply.status(401).send({
				error: 'INVALID_CREDENTIALS',
				message: 'Invalid username/email or password'
			});
		}

		const isPasswordValid = await verifyPassword(password, user.passwordHash);
		if (!isPasswordValid) {
			return reply.status(401).send({
				error: 'INVALID_CREDENTIALS',
				message: 'Invalid username/email or password'
			});
		}

		const userAgent = request.headers['user-agent'];
		const ip = request.ip;
		const session = await createSession(user._id, userAgent, ip);

		return reply.status(200).send({
			user: {
				id: user._id.toString(),
				email: user.email,
				username: user.username,
				displayName: user.displayName
			},
			token: session.token,
			expiresAt: session.expiresAt.toISOString()
		});
	});

	// POST /api/auth/logout
	app.post<{ Body?: { token?: string } }>('/logout', async (request, reply) => {
		let token: string | undefined = request.body?.token;

		const authHeader = request.headers.authorization;
		if (!token && authHeader?.startsWith('Bearer ')) {
			token = authHeader.substring(7).trim();
		}

		if (token) {
			await revokeSession(token);
		}

		return reply.status(200).send({ success: true });
	});

	// GET /api/auth/me
	app.get('/me', async (request, reply) => {
		const authHeader = request.headers.authorization;
		if (!authHeader?.startsWith('Bearer ')) {
			return reply.status(401).send({
				error: 'UNAUTHORIZED',
				message: 'Authorization header with Bearer token is required'
			});
		}

		const token = authHeader.substring(7).trim();
		const result = await validateSession(token);

		if (!result) {
			return reply.status(401).send({
				error: 'UNAUTHORIZED',
				message: 'Invalid or expired session'
			});
		}

		return reply.status(200).send({
			user: {
				id: result.user._id.toString(),
				email: result.user.email,
				username: result.user.username,
				displayName: result.user.displayName
			}
		});
	});
};
