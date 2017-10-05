const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const departments = await queries.department.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: departments[0]}
}
