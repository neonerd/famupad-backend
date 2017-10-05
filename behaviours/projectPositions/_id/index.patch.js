const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_position.update({'@project_position': ctx.request.body, 'id': ctx.params.id}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
