import { api } from '$lib/server/api.js';

export async function load() {
  const result = await api.venues();
  return { items: result || [] };
}
