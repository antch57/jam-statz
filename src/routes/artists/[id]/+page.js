import { getArtist } from '$lib/data/artists.js';
import { getShowsByArtist } from '$lib/data/shows.js';

export function load({ params }) {
  const artist = getArtist(params.id);
  const shows = artist ? getShowsByArtist(artist.id) : [];

  const attended = shows
    .filter((s) => s.attended)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const today = new Date().toISOString().split('T')[0];
  const upcoming = shows
    .filter((s) => !s.attended && s.date > today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    artist,
    attended,
    lastShow: attended[0] || null,
    nextShow: upcoming[0] || null,
  };
}
