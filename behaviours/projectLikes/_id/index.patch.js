const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_like.update({'@project_like': ctx.request.body, 'id': ctx.params.id}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
