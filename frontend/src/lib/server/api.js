import { shows } from '$lib/data/shows.js';
import { artists } from '$lib/data/artists.js';

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const byDateDesc = (a, b) => new Date(b.date) - new Date(a.date);

const attended = shows.filter((s) => s.attended).sort(byDateDesc);
const upcoming = shows.filter((s) => !s.attended).sort(byDateDesc);

function nextShowFor(predicate) {
  const today = new Date().toISOString().split('T')[0];
  return upcoming.find((s) => s.date >= today && predicate(s)) || null;
}

function venueGroups() {
  const groups = new Map();
  for (const show of attended) {
    if (!groups.has(show.venue)) {
      groups.set(show.venue, {
        venue: show.venue,
        city: show.city,
        slug: slugify(show.venue),
        shows: [],
      });
    }
    groups.get(show.venue).shows.push(show);
  }
  return [...groups.values()];
}

function topList(counts, keyFn) {
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([key, count]) => ({ ...keyFn(key), count }));
}

export const api = {
  stats: () => {
    const artistCounts = new Map();
    for (const show of attended) {
      artistCounts.set(show.artistId, (artistCounts.get(show.artistId) || 0) + 1);
    }
    const venueCounts = new Map();
    for (const group of venueGroups()) {
      venueCounts.set(group.venue, group.shows.length);
    }
    return {
      totalShows: attended.length,
      totalArtists: artists.length,
      uniqueVenues: venueGroups().length,
      topArtists: topList(artistCounts, (id) => {
        const artist = artists.find((a) => a.id === id);
        return { id, name: artist?.name };
      }),
      topVenues: topList(venueCounts, (venue) => {
        const group = venueGroups().find((g) => g.venue === venue);
        return { venue, city: group.city, slug: group.slug };
      }),
    };
  },

  shows: () => ({ items: attended }),

  show: (id) => shows.find((s) => s.id === Number(id)) || null,

  artists: () =>
    artists.map((a) => ({
      ...a,
      showsAttended: attended.filter((s) => s.artistId === a.id).length,
    })),

  artist: (id) => api.artists().find((a) => a.id === Number(id)) || null,

  artistShows: (id) => {
    const items = attended.filter((s) => s.artistId === Number(id));
    return { items, nextShow: nextShowFor((s) => s.artistId === Number(id)) };
  },

  venues: () =>
    venueGroups()
      .map(({ venue, city, slug, shows: venueShows }) => ({
        slug,
        venue,
        city,
        shows: venueShows.length,
        lastShow: venueShows[0]?.date,
      }))
      .sort((a, b) => b.shows - a.shows),

  venue: (slug) => {
    const group = venueGroups().find((g) => g.slug === slug);
    return group ? { name: group.venue, city: group.city } : null;
  },

  venueShows: (slug) => {
    const group = venueGroups().find((g) => g.slug === slug);
    return {
      items: group ? group.shows : [],
      nextShow: nextShowFor((s) => slugify(s.venue) === slug),
    };
  },
};
