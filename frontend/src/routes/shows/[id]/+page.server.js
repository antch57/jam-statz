import { api } from '$lib/server/api.js';

export async function load({ params }) {
  const show = await api.show(params.id);
  return { show };
}
