const moment = require('moment')
const queries = require('../../model/queries')

const behaviour = async function (ctx, next) {
  await queries.project_like.create({'$project_like': Object.assign({}, ctx.request.body, {
    user_id: ctx.user.id,
    createdAt: moment().unix()
  })}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}

module.exports = {
  middleware: [
    behaviour
  ],
  plugins: [
    'auth'
  ]
}