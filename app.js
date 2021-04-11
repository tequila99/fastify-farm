const SECRET = process.env.SECRET || '12929292929994949494949494'
const path = require('path')

const fastify = require('fastify')({
  logger: true
})

const autoload = require('fastify-autoload')

fastify
  .register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres@localhost/farm'
  })
  .register(require('fastify-cors'))
  .register(require('fastify-jwt'), {
    secret: SECRET
  })
  .register(autoload, {
    dir: path.join(__dirname, 'services')
  })

module.exports = fastify