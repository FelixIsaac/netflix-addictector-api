import Fastify from 'fastify';
import helmet from 'fastify-helmet';
import cors from 'fastify-cors';
import { getQuotes, getQuotesFromCategory } from './src/utils/server-utils.js';

const fastify = Fastify({ logger: true });

// fastify.register(helmet);
// fastify.register(cors);

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

fastify.listen(process.env.PORT || 5000, function (err, address) {
	if (err) fastify.log.error(err);
	fastify.log.info(`Server listening on ${address}`)
})
