const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const parameters = {}

  // Filter by department
  if (ctx.request.query.departmentId) {
    parameters['*departmentId'] = ctx.request.query.departmentId
  }

  // Filter by project
  if (ctx.request.query.projectTypeId) {
    parameters['*projectTypeId'] = ctx.request.query.projectTypeId
  }

  // Filter by smart query

  // SQL query itself
  const persons = await queries.project.get(parameters, ctx.sqlAdapter)

  // Response
  ctx.body = {status: 'OK', data: persons}
}
