import { getShowsByVenue } from '$lib/data/shows.js';

export function load({ params }) {
  const venueName = decodeURIComponent(params.slug);
  const shows = getShowsByVenue(venueName);

  const attended = shows
    .filter((s) => s.attended)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const today = new Date().toISOString().split('T')[0];
  const upcoming = shows
    .filter((s) => !s.attended && s.date > today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    venueName,
    city: attended[0]?.city || upcoming[0]?.city || '',
    attended,
    lastShow: attended[0] || null,
    nextShow: upcoming[0] || null,
  };
}
