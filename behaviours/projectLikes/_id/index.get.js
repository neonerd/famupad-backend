const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const project_likes = await queries.project_like.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_likes[0]}
}
