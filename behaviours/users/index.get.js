const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const users = await queries.user.get({}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: users}
}
