const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const project_types = await queries.project_type.get({}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_types}
}
