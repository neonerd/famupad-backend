const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const users = await queries.user.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: users[0]}
}
