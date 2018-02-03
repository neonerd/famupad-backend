// Config
if (!process.env.AWS_ACCESS_KEY_ID) throw new Error('Startup error: Missing AWS_ACCESS_KEY_ID')
if (!process.env.AWS_SECRET_ACCESS_KEY) throw new Error('Startup error: Missing AWS_SECRET_ACCESS_KEY')
if (!process.env.AWS_S3_REGION) throw new Error('Startup error: Missing AWS_S3_REGION')

const CONFIG_AWS_S3 = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_S3_REGION
}

// Dependencies
const edie = require('edie')
const puresql = require('puresql')
const koa = require('koa')
const sqlite = require('sqlite3')
const s3 = require('s3')
const AWS = require('aws-sdk')

const bodyParser = require('koa-bodyparser')
const cors = require('kcors')

// DB
const db = new sqlite.Database(__dirname + '/data/db.sqlite')
const adapter = puresql.adapters.sqlite(db)

const app = new koa()
const config = {
  port: 3010
}

// File-based store (for sessions)
const dirty = require('dirty')
const dirtyDb = dirty(__dirname + '/data/sessions.db')
// File-based session store
app.use(async function (ctx, next) {
  ctx.sessionStore = dirtyDb
  await next()
})

// SQLite3 DB
app.use(async function (ctx, next) {
  ctx.sqlAdapter = puresql.adapters.sqlite(db, (sql) => {
  })
  await next()
})

// S3 Wrapper
const s3Client = s3.createClient({
  s3Client: new AWS.S3(),
  s3Options: CONFIG_AWS_S3
})
app.use(async function (ctx, next) {
  ctx.s3 = s3Client

  const awsS3 = new AWS.S3({region: CONFIG_AWS_S3.region})
  ctx.generateS3URL = (bucket, key) => {
    const params = {Bucket: bucket, Key: key, Expires: 3600}
    return awsS3.getSignedUrl('getObject', params)
  }

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
