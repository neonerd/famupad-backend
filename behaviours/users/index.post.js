const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const newUser = ctx.request.body

  await queries.user.create({'$user': newUser}, ctx.sqlAdapter)

  ctx.body = {status: 'OK'}
}
