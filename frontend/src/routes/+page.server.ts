import type { PageServerLoad } from "./$types";

interface HelloResponse {
	message: string;
	database: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
	try {
		const res = await fetch(`${backendUrl}/api/hello`);
		if (!res.ok) {
			return {
				message: `Backend returned status ${res.status}`,
				database: "unknown"
			};
		}
		const data = (await res.json()) as HelloResponse;
		return {
			message: data.message,
			database: data.database
		};
	} catch (err: unknown) {
		const errorMessage = err instanceof Error ? err.message : String(err);
		return {
			message: `Failed to connect to backend: ${errorMessage}`,
			database: "disconnected"
		};
	}
};
