console.log('starting function')
exports.handle = function(e, ctx, cb) {
  console.log('processing event: %j', e);
  var currentDate = new Date().toTimeString();
  cb(null, { hello: 'hi everyone this is a demo for lv.com ' + currentDate })
}
