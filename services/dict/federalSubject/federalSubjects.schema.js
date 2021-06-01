const findAll = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          default: true
        },
        message: {
          type: 'string',
          default: 'Получен список федеральных субъектов'
        },
        entities: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'string'},
              name: { type: 'string' },
            },
            required: ['id', 'name']
          }
        }
      }
    }
  },
  query: {
    type: 'object',
    properties: {
      q: { type: 'string', default: '' }
    }
  }
}

const findOne = {
  response: {
    200: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
          default: true
        },
        message: {
          type: 'string',
          default: 'Получена информаия о федеральном субъекте'
        },
        federalSubject: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' }
          }
        }
      }
    },
    404: {
      type: 'object',
      properties: {
        success: { 
          type: 'boolean', default: false 
        },
        message: { 
          type: 'string', 
          default: 'Отсуствует федеральный субъект с указанным ID' 
        }
      }
    }
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', pattern: '^[0-9]{2}$' }
    }
  }
}

module.exports = { findAll, findOne }