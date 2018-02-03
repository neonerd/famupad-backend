const path = require('path')

const queries = require('../../../model/queries')

const behaviour = async function (ctx, next) {
  const file = (await queries.project_file.fetch({id: ctx.params.id}, ctx.sqlAdapter))[0]
  const fileUrl = ctx.generateS3URL('famupad', `${file.hash}${path.extname(file.filename)}`)

  ctx.redirect(fileUrl)
}

module.exports = {
  middleware: [
    behaviour
  ],
  plugins: [
    'auth'
  ]
}



