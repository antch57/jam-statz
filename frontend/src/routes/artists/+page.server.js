import { api } from '$lib/server/api.js';

export async function load() {
  const result = await api.artists();
  return { items: result || [] };
}
