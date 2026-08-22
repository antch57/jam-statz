import { api } from '$lib/server/api.js';

export async function load({ params }) {
  const artist = await api.artist(params.id);
  if (!artist) return { artist: null, attended: [], lastShow: null, nextShow: null };

  const { items: attended, nextShow } = await api.artistShows(params.id);

  return {
    artist,
    attended,
    lastShow: attended[0] || null,
    nextShow: nextShow || null,
  };
}
