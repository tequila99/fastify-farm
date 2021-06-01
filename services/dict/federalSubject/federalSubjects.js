// const { findAll, findOne } = require('@schemas/dict/federalSubject')
const { findAll, findOne } = require('./federalSubjects.schema')

module.exports = async (fastify, opts) => {
  fastify.get('/:id', { schema: findOne }, async (req, reply) => {
    const { rowCount, rows } = await fastify.pg.query(
      'SELECT * FROM dict_federal_subject WHERE id = $1',
      [ req.params.id ]
    )
    if (rowCount) return { federalSubject: rows[0] }
    reply.code(404)
    return Promise.reject({
      message: `Не найден федеральный субъект (область) с ID: ${ req.params.id }`
    })
  })
  fastify.get('/', { schema: findAll }, async (req, reply) => {
    const { rows } = await fastify.pg.query(
      'SELECT * FROM dict_federal_subject WHERE id = $1 OR name ~* $1',
      [ req.query.q ]
    )
    return { entities: rows }
  })
}
