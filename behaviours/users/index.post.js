const crypto = require('crypto')

const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const newUser = ctx.request.body

  // Create password hash
  const hash = crypto.createHash('sha1')
  hash.update(newUser.password)
  newUser.password = hash.digest('hex')

  await queries.user.create({'$user': newUser}, ctx.sqlAdapter)

  ctx.body = {status: 'OK'}
}
