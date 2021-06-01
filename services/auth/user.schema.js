const findAll = {
  response: {
    200: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'integer'},
          name: { type: 'string' },
          full_name: { 
            type: 'object',
            properties: {
              last_name: { type: 'string' },
              first_name: { type: 'string' },
              middle_name: { type: 'string' }
            },
            required: [ 'last_name', 'first_name']
          },
          type: { 
            type: 'string',
            enum: [ 'admin', 'user', 'guest' ],
            default: 'user' 
          },
          mobil_phone: { type: 'string'},
        },
        required: ['id', 'name', 'type','mobil_phone']
      }
    }
  }
}

const findOne = {
  response: {
    200: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        timestamp: { type: 'integer' },
        done: { type: 'boolean' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  },
  params: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }
}

const insertOne = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }
}

const updateOne = {
  body: {
    type: 'object',
    properties: {
      done: { type: 'boolean' }
    }
  },
  params: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }
}

const deleteOne = {
  params: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }
}

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }