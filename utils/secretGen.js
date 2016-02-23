
require('crypto').randomBytes(18 /* avoid padding by using a number which is divisible by 3 */, function(ex, buf) {
	if (ex) throw ex;
	console.log(buf.toString('base64'));
});
