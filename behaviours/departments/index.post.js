const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  await queries.department.create({'$department': ctx.request.body}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
