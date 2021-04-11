const { findAll } = require('../schemas/user')

module.exports = async (fastify, opts) => {
  fastify.get('/:id', async (req, reply) => {
    const { rowCount, rows } = await fastify.pg.query(
      'SELECT * FROM auth_user WHERE id = $1',
      [ req.params.id ]
    )
    return rowCount ? rows[0] : Promise.reject(`Не найден пользователь с ID: ${ req.params.id }`)
  })
  fastify.get('/', { schema: findAll }, async (req, reply) => {
    const { rows } = await fastify.pg.query(
      'SELECT * FROM auth_user',
      []
    )
    return rows
  })
}

module.exports.autoPrefix = '/user'