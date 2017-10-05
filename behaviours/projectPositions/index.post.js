const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_position.create({'$project_position': ctx.request.body}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
