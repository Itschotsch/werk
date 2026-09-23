import fastify from 'fastify';
import cors from '@fastify/cors';
import mongoose from 'mongoose';

const PORT = parseInt(process.env.PORT || '3001', 10);
const HOST = process.env.HOST || '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/werk';

const app = fastify({ logger: true });

await app.register(cors, { origin: true });

// Health check endpoint (for Docker healthcheck)
app.get('/api/health', async () => {
	const isConnected = mongoose.connection.readyState === 1;
	return {
		status: isConnected ? 'ok' : 'degraded',
		database: isConnected ? 'connected' : 'disconnected'
	};
});

// Hello World endpoint
app.get('/api/hello', async () => {
	const isConnected = mongoose.connection.readyState === 1;
	return {
		message: 'Hello World from the backend!',
		database: isConnected ? 'connected' : 'disconnected'
	};
});

async function start() {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log(`[Database] Connected to MongoDB at ${MONGODB_URI}`);
		await app.listen({ port: PORT, host: HOST });
		console.log(`[Backend] Server listening on http://${HOST}:${PORT}`);
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
}

start();
