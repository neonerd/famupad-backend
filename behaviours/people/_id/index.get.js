const queries = require('../../../model/queries')

module.exports = async function (ctx, next) {
  const persons = await queries.person.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: persons[0]}
}
