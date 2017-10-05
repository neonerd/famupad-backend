const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const parameters = {}

  // Filter by department
  if (ctx.request.query.departmentId) {
    parameters['*departmentId'] = ctx.request.query.departmentId
  }

  // Filter by smart query

  // SQL query itself
  const persons = await queries.person.get(parameters, ctx.sqlAdapter)

  // Response
  ctx.body = {status: 'OK', data: persons}
}
