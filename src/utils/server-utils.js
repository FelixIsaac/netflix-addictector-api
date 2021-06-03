import { promises as fs, existsSync } from 'fs';
import { resolve as resolvePath } from 'path';

export async function getQuotes(datasourcePath = './src/quotes') {
	return fs.readdir(resolvePath(datasourcePath));
}

export async function randomCategory() {
	const categories = await getQuotes();
	return categories[Math.floor(Math.random() * categories.length - 1)];
}

export async function getQuotesFromCategory(category, limit = 30, after = 0) {
	// asign random category if not category provided
	after = Math.max(after - 1, 0);
	category ||= await randomCategory();
	const path = resolvePath(`./src//quotes/${category}`);

	if (!existsSync(path)) throw new Error('Quotes unavailable or not found');

	const quotes = JSON.parse((await fs.readFile(path, 'utf8')) || '[]');
	return quotes.slice(after, limit + after).slice(0, limit);
}
