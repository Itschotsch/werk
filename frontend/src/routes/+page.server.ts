import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  try {
    const res = await fetch(`${backendUrl}/api/hello`);
    if (!res.ok) {
      return {
        message: `Backend returned status ${res.status}`,
        database: 'unknown'
      };
    }
    const data = await res.json();
    return {
      message: data.message,
      database: data.database
    };
  } catch (err: any) {
    return {
      message: `Failed to connect to backend: ${err.message}`,
      database: 'disconnected'
    };
  }
};
