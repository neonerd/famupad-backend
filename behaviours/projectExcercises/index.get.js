const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  const project_excercises = await queries.project_excercise.get({}, ctx.sqlAdapter)

  ctx.body = {status: 'OK', data: project_excercises}
}
