const { findAll, findOne } = require('./typeUnit.schema')

module.exports = async (fastify, opts) => {
  fastify.get('/:id', { schema: findOne }, async (req, reply) => {
    const { rowCount, rows } = await fastify.pg.query(
      'SELECT * FROM dict_type_unit WHERE id = $1',
      [ req.params.id ]
    )
    if (rowCount) return { typeUnit: rows[0] }
    reply.code(404)
    return Promise.reject({
      message: `Не найден тип единицы измерения с ID: ${ req.params.id }`
    })
  })
  fastify.get('/', { schema: findAll }, async (req, reply) => {
    const { rows } = await fastify.pg.query(
      'SELECT * FROM dict_type_unit WHERE name ~* $1',
      [ req.query.q ]
    )
    return { entities: rows }
  })
}
