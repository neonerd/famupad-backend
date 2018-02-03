const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const project_files = await queries.project_file.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_files[0]}
}
