import Fastify from 'fastify';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import { getQuotes, getQuotesFromCategory, getQuotesFromCategories } from './src/utils/server-utils.js';

const fastify = Fastify({ logger: false });

fastify.register(helmet);
fastify.register(cors);

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (request, body, done) {
	try {
		const json = JSON.parse(body);
		done(null, json);
	} catch (err) {
		err.statusCode = 400;
		done(err, undefined);
	}
})

fastify.get('/', async function (response, reply) {
	const quotes = await getQuotes();
	
	return {
		message: 'List of categories of quotes',
		statusCode: 200,
		quotes
	};
})

fastify.get('/quotes', async function (response, reply) {
	const { limit, after } = response.query;
	const quotes = await getQuotesFromCategory(undefined, limit, after);

	return {
		message: 'Random category quotes',
		statusCode: 200,
		quotes
	};
})

fastify.get('/quotes/:category', async function (response, reply) {
	const { category } = response.params;
	const { limit, after } = response.query;
	const quotes = await getQuotesFromCategory(category, limit, after);

	return {
		message: 'Category quotes',
		statusCode: 200,
		quotes
	};
})


const fromCategoriesOptions = {
	schema: {
		body: {
			type: 'object',
			properties: {
				[{ type: 'string' }]: { type: 'string' }
			}
		}
	}
}

fastify.post('/quotes/fromcategories', fromCategoriesOptions, async function (response, reply) {
	const { categories } = response.body; // categories is obj { categoryName: {limit:num,after:num} } 
	const { limit } = response.query; // limit is total limit of quotes
	const categoryQuotes = await getQuotesFromCategories(categories, limit);

	return {
		message: 'Categories\' quotes',
		statusCode: 200,
		categoryQuotes
	}
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0', function (err, address) {
	if (err) fastify.log.error(err);
	fastify.log.info(`Server listening on ${address}`)
})
