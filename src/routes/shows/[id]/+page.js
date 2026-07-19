import { getShowById } from '$lib/data/shows.js';

export function load({ params }) {
  const show = getShowById(params.id);
  return { show };
}
