const path = require('path')
const crypto = require('crypto')

// Upload middleware
const multer = require('koa-multer')
const upload = multer({dest: __dirname + '/../../uploads'})

module.exports = {
  middleware: [
    upload.single('file'),
    async function (ctx, next) {
      const hash = crypto.createHash('sha1')
      hash.update(ctx.req.file.originalname)
      hash.update(String(Math.random()))

      const fileData = {
        fileName: ctx.req.file.originalname,
        fileHash: hash.digest('hex')
      }

      const s3Uploader = ctx.s3.uploadFile({
        localFile: ctx.req.file.path,
        s3Params: {
          Bucket: 'famupad',
          Key: `${fileData.fileHash}${path.extname(fileData.fileName)}`,
          ContentDisposition: `attachment; filename=${fileData.fileName}`
        }
      })

      s3Uploader.on('error', err => {
        console.log('S3 Upload Error: ', err)
      })

      s3Uploader.on('end', () => {
        console.log('S3 Upload Finished!')
      })

      ctx.body = {status: 'OK', data: fileData}
    }
  ],
  plugins: []
}