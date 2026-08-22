import { api } from '$lib/server/api.js';

export async function load() {
  const result = await api.shows({ limit: 500, page: 1 });
  return { items: result?.items || [] };
}
