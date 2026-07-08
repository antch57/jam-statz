import { artists } from './artists.js';
import { shows } from './shows.js';

const uniqueVenues = new Set(shows.map((s) => s.venue));

function topArtist() {
	const counts = {};
	for (const show of shows) {
		counts[show.artist] = (counts[show.artist] || 0) + 1;
	}
	const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
	const [name, count] = entries[0];
	const artist = artists.find((a) => a.name === name);
	return { name, count, artistId: artist?.id };
}

function mostRecentShow() {
	return [...shows].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

function showsByMonth() {
	const months = {};
	for (const show of shows) {
		const month = show.date.slice(0, 7);
		months[month] = (months[month] || 0) + 1;
	}
	return Object.entries(months)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([month, count]) => ({ month, count }));
}

function totalRatings() {
	const rated = shows.filter((s) => s.rating);
	const sum = rated.reduce((acc, s) => acc + s.rating, 0);
	return { avg: (sum / rated.length).toFixed(1), total: rated.length };
}

export const stats = {
	totalShows: shows.length,
	totalArtists: artists.length,
	uniqueVenues: uniqueVenues.size,
	topArtist: topArtist(),
	mostRecentShow: mostRecentShow(),
	showsByMonth: showsByMonth(),
	ratings: totalRatings(),
};
