const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  await queries.user.update({'@user': ctx.request.body, 'id': ctx.params.id}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
