const path = require('path')

const SECRET = process.env.SECRET || '12929292929994949494949494'
const PG_CONNECT = process.env.PG_CONNECT || 'postgres://work:work@localhost/work'

const fastify = require('fastify')({
  logger: true
})

const autoload = require('fastify-autoload')

fastify
  .register(require('fastify-postgres'), {
    connectionString: PG_CONNECT
  })
  .register(require('fastify-cors'))
  .register(require('fastify-jwt'), {
    secret: SECRET
  })
  .register(autoload, {
    dir: path.join(__dirname, 'services'),
    options: { prefix: '/api/v1' },
    dirNameRoutePrefix: (folderParent, folderName) => folderName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase(),
    ignorePattern: /.*(test|spec|schema).js/
  })

module.exports = fastify