export default {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					message: { type: 'string' },
					statusCode: { type: 'number' },
					quotes: {
						type: 'array',
						items: { $ref: 'quote' }
					}
				}
			},
			'4xx': {
				type: 'object',
				properties: {
					message: { type: 'string' },
					statusCode: { type: 'number' }
				}
			},
			'5xx': {
				type: 'object',
				properties: {
					message: { type: 'string' },
					statusCode: { type: 'number' }
				}
			}
		}
	}
}
