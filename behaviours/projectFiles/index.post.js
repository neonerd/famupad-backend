const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_file.create({'$project_file': ctx.request.body}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
