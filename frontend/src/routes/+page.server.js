import { api } from '$lib/server/api.js';

export async function load() {
  const [stats, recent] = await Promise.all([api.stats(), api.shows({ limit: 5, page: 1 })]);
  return { stats, recent: recent?.items || [] };
}
