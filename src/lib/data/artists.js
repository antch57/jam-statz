import { shows } from './shows.js';

export const rawArtists = [
  {
    id: 1,
    name: 'Phish',
    genre: 'Jam Band',
    hometown: 'Burlington, VT',
  },
  {
    id: 2,
    name: 'Goose',
    genre: 'Jam Band',
    hometown: 'Norwalk, CT',
  },
  {
    id: 3,
    name: 'Billy Strings',
    genre: 'Bluegrass',
    hometown: 'Muir, MI',
  },
  {
    id: 4,
    name: 'Dead & Company',
    genre: 'Jam Band',
    hometown: 'San Francisco, CA',
  },
  {
    id: 5,
    name: "Umphrey's McGee",
    genre: 'Prog Jam',
    hometown: 'South Bend, IN',
  },
  {
    id: 6,
    name: 'Widespread Panic',
    genre: 'Southern Rock',
    hometown: 'Athens, GA',
  },
  {
    id: 7,
    name: 'String Cheese Incident',
    genre: 'Jam Band',
    hometown: 'Crested Butte, CO',
  },
  {
    id: 8,
    name: 'Lotus',
    genre: 'Electronic Jam',
    hometown: 'Philadelphia, PA',
  },
  {
    id: 9,
    name: 'moe.',
    genre: 'Jam Band',
    hometown: 'Buffalo, NY',
  },
  {
    id: 10,
    name: 'The Disco Biscuits',
    genre: 'Electronic Jam',
    hometown: 'Philadelphia, PA',
  },
];

export const artists = rawArtists.map((a) => {
  const artistShows = shows
    .filter((s) => s.artistId === a.id && s.attended)
    .sort((x, y) => new Date(y.date) - new Date(x.date));
  return {
    ...a,
    showsAttended: artistShows.length,
    lastShow: artistShows[0]?.date || null,
  };
});

export function getArtist(id) {
  return artists.find((a) => a.id === Number(id));
}

export function getArtistByName(name) {
  return artists.find((a) => a.name === name);
}
