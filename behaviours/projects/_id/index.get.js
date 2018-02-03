const queries = require('../../../model/queries')

const behaviour = async function (ctx, next) {
  const projects = await queries.project.fetch({id: ctx.params.id}, ctx.sqlAdapter)

  projects[0].people = await queries.project_person.populate_project({project_id: projects[0].id}, ctx.sqlAdapter)
  projects[0].links = await queries.project_link.populate_project({project_id: projects[0].id}, ctx.sqlAdapter)
  projects[0].files = await queries.project_file.populate_project({project_id: projects[0].id}, ctx.sqlAdapter)
  projects[0].like = (await queries.project_like.populate_projects_by_user({project_ids: [projects[0].id], user_id: ctx.user.id}, ctx.sqlAdapter))[0]

  ctx.body = {status: 'OK', data: projects[0]}
}

module.exports = {
  middleware: [
    behaviour
  ],
  plugins: [
    'auth'
  ]
}



