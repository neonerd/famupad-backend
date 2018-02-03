const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_file.update({'@project_file': ctx.request.body, 'id': ctx.params.id}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
