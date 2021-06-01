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
          default: 'Получен список единиц измерения'
        },
        entities: {
          type: 'array',
          items: {
            properties: {
              id: { type: 'string' },
              fullName: { type: 'string' },
              name: { type: 'string' },
              engName: { type: 'string' },
              typeUnit: {
                type: 'object',
                properties: {
                  id: { type: 'integer' },
                  name: { type: 'string' }
                }
              }
            }
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
          default: 'Получена информаия о единице измерения'
        },
        unit: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            fullName: { type: 'string' },
            name: { type: 'string' },
            engName: { type: 'string' },
            typeUnit: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                name: { type: 'string' }
              }
            }
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
          default: 'Отсуствует единица измерения с указанным ID' 
        }
      }
    }
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string', pattern: '^\\d{3}$' }
    }
  }
}

module.exports = { findAll, findOne }