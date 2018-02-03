const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const project_persons = await queries.project_person.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_persons[0]}
}
