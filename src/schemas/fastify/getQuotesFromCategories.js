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
					},
					errors: {
						type: 'array',
						items: {
							type: 'object',
							properties: {
								category: { type: 'string' },
								message: { type: 'string' },
								errorCode: { type: 'number' }
							}
						}
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
		},
		body: {
			type: 'object',
			properties: {
				categories: {
					type: 'array',
					minItems: 1,
					items: {
						type: 'object',
						properties: {
							category: { type: 'string' },
							after: { type: 'number'},
							limit: {
								type: 'number',
								minimum: 1
							}
						},
						required: ['category']
					},
				}
			},
			required: ['categories'],
		}
	}
}
