const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const project_positions = await queries.project_position.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_positions[0]}
}
