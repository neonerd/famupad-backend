const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const project_persons = await queries.project_person.get({}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_persons}
}
