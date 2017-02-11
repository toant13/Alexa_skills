console.log('Starting ten second journal')
exports.handle = function(e, ctx, cb) {
  console.log('processing event: %j', e)
  cb(null, { hello: 'world' })
}
