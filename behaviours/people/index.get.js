const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const parameters = {}

  // Filter by department
  if (ctx.request.query.departmentId) {
    parameters['*departmentId'] = ctx.request.query.departmentId
  }
  if (ctx.request.query.sort) {
    const order = ctx.request.query.sort[0]=='-' ? 'DESC' : 'ASC'
    parameters['*orderBy'] = `${ctx.request.query.sort.replace('-', '')} ${order}`
  }

  // Filter by smart query

  // SQL query itself
  const persons = await queries.person.get(parameters, ctx.sqlAdapter)

  // Response
  ctx.body = {status: 'OK', data: persons}
}
