const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  await queries.project_person.create({'$project_person': ctx.request.body}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
