import { api } from '$lib/server/api.js';

export async function load({ params }) {
  const venue = await api.venue(params.slug);
  if (!venue) return { venueName: null, city: '', attended: [], lastShow: null, nextShow: null };

  const { items: attended, nextShow } = await api.venueShows(params.slug);

  return {
    venueName: venue.name,
    city: venue.city,
    attended,
    lastShow: attended[0] || null,
    nextShow: nextShow || null,
  };
}
