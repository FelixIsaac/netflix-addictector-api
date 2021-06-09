import Fastify from 'fastify';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import { getQuotes, getQuotesFromCategory, getQuotesFromCategories } from './utils/server-utils.js';
import {
	getQuotesOptions, quoteSchema, getRootOptions, getQuotesFromCategoriesOptions
} from './schemas/fastify/index.js';

const fastify = Fastify({ logger: true });

fastify.register(helmet);
fastify.register(cors);

fastify.addSchema({
	$id: 'quote',
	...quoteSchema
})

fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (request, body, done) {
	try {
		const json = JSON.parse(body);
		done(null, json);
	} catch (err) {
		err.statusCode = 400;
		done(err, undefined);
	}
})

fastify.get('/', getRootOptions, async function (response, reply) {
	const quotes = await getQuotes();
	
	return {
		message: 'List of categories of quotes',
		statusCode: 200,
		quotes
	};
})

fastify.get('/quotes', getQuotesOptions, async function (response, reply) {
	const { limit, after } = response.query;
	const quotes = await getQuotesFromCategory(undefined, limit, after);

	return {
		message: 'Random category quotes',
		statusCode: 200,
		quotes
	};
})

fastify.get('/quotes/:category', getQuotesOptions, async function (response, reply) {
	const { category } = response.params;
	const { limit, after } = response.query;
	const quotes = await getQuotesFromCategory(category, limit, after);

	return {
		message: 'Category quotes',
		statusCode: 200,
		quotes
	};
})

fastify.post('/quotes/fromcategories', getQuotesFromCategoriesOptions, async function (response, reply) {
	const { categories } = response.body;
	const { limit } = response.query;
	const { quotes, errors } = await getQuotesFromCategories(categories, limit);

	return {
		message: 'Categories\' quotes',
		statusCode: 200,
		quotes,
		errors
	}
})

fastify.listen(process.env.PORT || 3000, '0.0.0.0', function (err, address) {
	if (err) fastify.log.error(err);
	fastify.log.info(`Server listening on ${address}`)
})
