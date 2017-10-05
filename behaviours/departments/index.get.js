const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const departments = await queries.department.get({}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: departments}
}
