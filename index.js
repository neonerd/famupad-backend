const edie = require('edie')
const puresql = require('puresql')
const koa = require('koa')
const sqlite = require('sqlite3')

const bodyParser = require('koa-bodyparser');
const cors = require('kcors')

const db = new sqlite.Database(__dirname + '/data/db.sqlite')
const adapter = puresql.adapters.sqlite(db)

const app = new koa()

const config = {
  port: 3010
}

// SQLite3 DB
app.use(async function (ctx, next) {
  ctx.sqlAdapter = puresql.adapters.sqlite(db, (sql) => {
    console.log('SQLite Query: ', sql)
  })
  await next()
})

// CORS
app.use(cors())

// Body parsin
app.use(bodyParser())

// Routing via Edie
const router = edie(__dirname + '/behaviours', __dirname + '/plugins')
app.use(router.routes())
app.use(router.allowedMethods())

// Start the application
app.listen(config.port)
console.log(`FamuPAD backend is listening on ${config.port}`)
