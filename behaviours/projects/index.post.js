const slug = require('slug')

const queries = require('../../model/queries')
const datetime = require('../../lib/datetime')

module.exports = async function (ctx, next) {
  await queries.project.create(
    {
      '$project': Object.assign({}, datetime.getObjectWithDatetimes(['createdAt', 'updatedAt'], ctx.request.body), {
        slug: slug(ctx.request.body.name).toLowerCase()
      })
    },
    ctx.sqlAdapter
  )
  ctx.body = {status: 'OK'}
}
