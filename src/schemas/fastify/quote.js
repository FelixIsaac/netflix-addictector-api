export default {
	type: 'object',
	properties: {
		author: { type: ['string', 'null'] },
		quote: { type: 'string' },
	},
	required: ['quote']
}
