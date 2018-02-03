const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_link.create({'$project_link': ctx.request.body}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
