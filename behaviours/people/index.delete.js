const queries = require('../../model/queries')

module.exports = async function (ctx, next) {
  await queries.person.remove({'ids': ctx.request.body}, ctx.sqlAdapter)
  ctx.body = {status: 'OK'}
}
