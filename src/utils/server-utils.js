import { promises as fs, existsSync } from 'fs';
import { resolve as resolvePath } from 'path';

export async function getQuotes(datasourcePath = './quotes') {
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
	const path = resolvePath(`./quotes/${category}`);

	if (!existsSync(path)) throw new Error('Quotes unavailable or not found');

	const quotes = JSON.parse((await fs.readFile(path, 'utf8')) || '[]');
	return quotes.slice(after, limit + after).splice(0, limit);
}

// limit 0 for no limit
export async function getQuotesFromCategories(categories = [], limit = 0) {
	const errors = []

	const quotes = categories.map(async (categoryData) => {
		const { limit, after, category } = categoryData;
		const quotes = await getQuotesFromCategory(category, limit, after);

		// no more quotes in the "?after" index, send error
		if (!quotes.length) errors.push({
			category,
			errorCode: 3,
			message: 'No quotes found, consider decreaing "after" query value'
		})

		return quotes;
	});

	const result = await Promise.all(quotes);
	result.splice(0, limit);

	return {
		quotes: result.flat(),
		errors
	};
}
