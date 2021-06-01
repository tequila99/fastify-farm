const { findAll, findOne } = require('./unit.schema')
const transformTo = ({ type_unit:typeUnit, full_name:fullName, eng_name:engName, ...rest }) => ({
  ...rest, fullName, engName, typeUnit
})

module.exports = async (fastify, opts) => {
  fastify.get('/:id', { schema: findOne }, async (req, reply) => {
    const { rowCount, rows } = await fastify.pg.query(
      `SELECT a.*,
       jsonb_build_object(
         'id', coalesce(b.id,0), 
         'name', coalesce(b.name, '')
        ) AS type_unit
       FROM dict_unit AS a
       LEFT JOIN dict_type_unit AS b ON a.dict_type_unit_id = b.id 
       WHERE a.id = $1`,
      [ req.params.id ]
    )
    if (rowCount) return { unit: transformTo(rows[0]) }
    reply.code(404)
    return Promise.reject({
      message: `Не найдена единица измерения с ID: ${ req.params.id }`
    })
  })
  fastify.get('/', { schema: findAll }, async (req, reply) => {
    const { rows } = await fastify.pg.query(
      `SELECT 
        a.*,
        jsonb_build_object(
          'id', coalesce(b.id,0), 
          'name', coalesce(b.name, '')
         ) AS type_unit        
       FROM dict_unit AS a
       LEFT JOIN dict_type_unit AS b ON a.dict_type_unit_id = b.id        
       WHERE normalize_string(a.full_name) ~* $1 OR a.name = $1`,
      [ req.query.q ]
    )
    return { entities: rows.map(el => transformTo(el)) }
  })
}
