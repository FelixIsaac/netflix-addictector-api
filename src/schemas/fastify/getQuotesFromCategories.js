export default {
	schema: {
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
				},
			},
			required: ['categories'],
		}
	}
}
