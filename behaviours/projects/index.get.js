const R = require('ramda')

const queries = require('../../model/queries')
const db = require('../../lib/db')

module.exports = {
  middleware: [
    async function (ctx, next) {
      const parameters = {}

      // Filter by department
      if (ctx.request.query.departmentId) {
        parameters['*departmentId'] = ctx.request.query.departmentId
      }

      // Filter by project
      if (ctx.request.query.projectTypeId) {
        parameters['*projectTypeId'] = ctx.request.query.projectTypeId
      }

      // Sort by
      if (ctx.request.query.sort) {
        const order = ctx.request.query.sort[0]=='-' ? 'DESC' : 'ASC'
        parameters['*orderBy'] = `${ctx.request.query.sort.replace('-', '')} ${order}`
      }

      // Only liked
      if (ctx.request.query.isLiked) {
        parameters['*isLiked'] = ctx.user.id
      }

      // Filter by smart query

      // SQL query itself
      const projects = await queries.project.get(parameters, ctx.sqlAdapter)

      // Populate with likes
      const projectLikes = await queries.project_like.populate_projects_by_user({
        project_ids: projects.map(p => p.id),
        user_id: ctx.user.id
      }, ctx.sqlAdapter)

      // Populate with files
      const projectFiles = await queries.project_file.populate_projects({
        project_ids: projects.map(p => p.id),
      }, ctx.sqlAdapter)

      // Populate with positions
      const projectPeople = await queries.project_person.populate_projects({
        project_ids: projects.map(p => p.id),
      }, ctx.sqlAdapter)

      // Build the response
      const projectsWithLikes = projects.map(p => {
        p.like = projectLikes.filter(l => l.project_id == p.id)[0] || null
        return p
      })
      const projectsWithLikesAndFiles = db.mapFromMultipleToOne(projectsWithLikes, projectFiles, 'files', 'project_id')
      const projectsWithLikesAndFilesAndPeople = db.mapFromMultipleToOne(projectsWithLikesAndFiles, projectPeople, 'people', 'project_id')

      // Response
      ctx.body = {status: 'OK', data: projectsWithLikesAndFilesAndPeople}
    }
  ],
  plugins: ['auth']
}
