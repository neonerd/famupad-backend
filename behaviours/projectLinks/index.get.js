const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const project_links = await queries.project_link.get({}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_links}
}
