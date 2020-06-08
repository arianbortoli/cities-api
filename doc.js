export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'My State-Cities API',
    version: 'beta 1.0.0',
    title: 'My State-Cities API',
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'States',
      description: 'States information',
    },
  ],
  paths: {
    '/state/top5': {
      get: {
        tags: ['States'],
        summary: 'Get Top 5 states with most cities',
        description: 'Get Top 5 states with most cities',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
    '/state/bottom5': {
      get: {
        tags: ['States'],
        summary: 'Get 5 states with lowest number of cities',
        description: 'Get 5 states with lowest number of cities',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
    '/state/bottomCity': {
      get: {
        tags: ['States'],
        summary: 'Get City with lowest letters for each State',
        description: 'Get City with lowest letters for each State',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
    '/state/bottomCity/{State}': {
      get: {
        tags: ['States'],
        summary: 'Get City with lowest letters for that State',
        description: 'Get City with lowest letters for that State',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'State',
            description: 'State abreviation to request',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },

    '/state/lowestCity': {
      get: {
        tags: ['States'],
        summary: 'Get City with lowest letters from all states',
        description: 'Get City with lowest letters from all State',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },

    '/state/topCity': {
      get: {
        tags: ['States'],
        summary: 'Get City with most letters for each State',
        description: 'Get City with most letters for each State',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
    '/state/topCity/{State}': {
      get: {
        tags: ['States'],
        summary: 'Get City with most letters for that State',
        description: 'Get City with most letters for that State',
        produces: ['application/json'],
        parameters: [
          {
            in: 'path',
            name: 'State',
            description: 'State abreviation to request',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },

    '/state/highestCity': {
      get: {
        tags: ['States'],
        summary: 'Get City with most letters from all states',
        description: 'Get City with most letters from all State',
        produces: ['application/json'],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'string',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },

    '/state/{State}': {
      get: {
        tags: ['States'],
        summary: 'Get number of cities for State',
        description: 'Get number of cities for requested State',
        produces: ['application/json'],

        parameters: [
          {
            in: 'path',
            name: 'State',
            description: 'State abreviation to request',
            required: true,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'successful operation',
            schema: {
              type: 'number',
            },
          },
          '400': {
            description: 'Error occurred',
          },
        },
      },
    },
  },
  definitions: {
    State: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '23',
        },
        Sigla: {
          type: 'string',
          example: 'RS',
        },
        Nome: {
          type: 'string',
          example: 'Rio Grande do Sul',
        },
        Cidades: {
          type: 'array',
          json: {
            ID: '4174',
            Nome: 'Porto Alegre',
            Estado: '23',
          },
          items: {
            type: 'string',
          },
        },
      },
    },
  },
};
