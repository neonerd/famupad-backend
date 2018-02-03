const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_link.update({'@project_link': ctx.request.body, 'id': ctx.params.id}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
