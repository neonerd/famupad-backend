const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const project_positions = await queries.project_position.get({}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_positions}
}
