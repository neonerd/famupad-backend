const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const persons = await queries.person.fetch({id: ctx.params.id}, ctx.sqlAdapter)
  const person = persons[0]

  person.projects = await queries.project.get({'*personId': person.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: person}
}
