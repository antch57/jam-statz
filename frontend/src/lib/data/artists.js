export const artists = [
  {
    id: 1,
    name: 'Phish',
    genre: 'Jam Band',
    showsAttended: 42,
    lastShow: '2025-12-31',
    hometown: 'Burlington, VT',
  },
  {
    id: 2,
    name: 'Goose',
    genre: 'Jam Band',
    showsAttended: 18,
    lastShow: '2026-03-15',
    hometown: 'Norwalk, CT',
  },
  {
    id: 3,
    name: 'Billy Strings',
    genre: 'Bluegrass',
    showsAttended: 9,
    lastShow: '2026-02-22',
    hometown: 'Muir, MI',
  },
  {
    id: 4,
    name: 'Dead & Company',
    genre: 'Jam Band',
    showsAttended: 15,
    lastShow: '2025-07-06',
    hometown: 'San Francisco, CA',
  },
  {
    id: 5,
    name: "Umphrey's McGee",
    genre: 'Prog Jam',
    showsAttended: 7,
    lastShow: '2025-10-18',
    hometown: 'South Bend, IN',
  },
  {
    id: 6,
    name: 'Widespread Panic',
    genre: 'Southern Rock',
    showsAttended: 12,
    lastShow: '2025-11-02',
    hometown: 'Athens, GA',
  },
  {
    id: 7,
    name: 'String Cheese Incident',
    genre: 'Jam Band',
    showsAttended: 5,
    lastShow: '2025-08-15',
    hometown: 'Crested Butte, CO',
  },
  {
    id: 8,
    name: 'Lotus',
    genre: 'Electronic Jam',
    showsAttended: 4,
    lastShow: '2025-09-20',
    hometown: 'Philadelphia, PA',
  },
  {
    id: 9,
    name: 'moe.',
    genre: 'Jam Band',
    showsAttended: 6,
    lastShow: '2025-06-12',
    hometown: 'Buffalo, NY',
  },
  {
    id: 10,
    name: 'The Disco Biscuits',
    genre: 'Electronic Jam',
    showsAttended: 3,
    lastShow: '2025-11-29',
    hometown: 'Philadelphia, PA',
  },
];

export function getArtist(id) {
  return artists.find((a) => a.id === id);
}

export function getArtistByName(name) {
  return artists.find((a) => a.name === name);
}
