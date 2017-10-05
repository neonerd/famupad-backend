const slug = require('slug')

const queries = require('../../model/queries')
const datetime = require('../../lib/datetime')

module.exports = async function (ctx, next) {
  await queries.person.create(
    {
      '$person': Object.assign({}, datetime.getObjectWithDatetimes(['createdAt', 'updatedAt'], ctx.request.body), {
        slug: slug(`${ctx.request.body.firstName} ${ctx.request.body.lastName}`).toLowerCase()
      })
    },
    ctx.sqlAdapter
  )
  ctx.body = {status: 'OK'}
}
