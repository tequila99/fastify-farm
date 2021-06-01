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
          default: 'Получен список типов единиц измерения'
        },
        entities: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'integer' },
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
          default: 'Получена информаия о типе единицы измерения'
        },
        typeUnit: {
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
          default: 'Отсуствует тип единицы измерения с указанным ID' 
        }
      }
    }
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
}

module.exports = { findAll, findOne }