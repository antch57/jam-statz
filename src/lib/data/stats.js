import { artists } from './artists.js';
import { shows } from './shows.js';

const uniqueVenues = new Set(shows.map((s) => s.venue));

function topArtists() {
  const counts = {};
  for (const show of shows.filter((s) => s.attended)) {
    counts[show.artist] = (counts[show.artist] || 0) + 1;
  }
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => {
      const artist = artists.find((a) => a.name === name);
      return { name, count, id: artist?.id };
    });
}

function topVenues() {
  const counts = {};
  for (const show of shows.filter((s) => s.attended)) {
    const key = show.venue;
    if (!counts[key]) {
      counts[key] = { venue: show.venue, city: show.city, count: 0 };
    }
    counts[key].count++;
  }
  return Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 5);
}

export const stats = {
  totalShows: shows.filter((s) => s.attended).length,
  totalArtists: artists.length,
  uniqueVenues: uniqueVenues.size,
  topArtists: topArtists(),
  topVenues: topVenues(),
};
