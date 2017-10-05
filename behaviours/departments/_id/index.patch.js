const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  await queries.department.update({'@department': ctx.request.body, 'id': ctx.params.id}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
