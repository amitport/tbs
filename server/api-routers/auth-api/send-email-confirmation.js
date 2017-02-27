const config = require('config');
const appName = config.get('appName');

const Bluebird = require('bluebird');
const SparkPost = require('sparkpost');
const sparkPost = {};//new SparkPost();
const sendEmail = {};//Bluebird.promisify(sparkPost.transmissions.send);

module.exports = async function sendEmailConfirmation(email, cbUrl) {
  await sendEmail({
    transmissionBody: {
      content: {
        from: {
          name: appName,
          email: "sandbox@sparkpostbox.com"
        },
        subject: 'Sign in to ' + appName,
        reply_to: 'Amit Portnoy <amit.portnoy@gmail.com>',
        text: `
Use the following link to sign in:
${cbUrl}

You're receiving this message because someone used your Email address. Please ignore it if you didn't request to sign in to ${appName}.
`,
        html: renderEmailConfimEmail(cbUrl)
      },
      recipients: [{address: {email}}]
    }
  });
}

function renderEmailConfimEmail(cbUrl) {
  return `\
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title></title>
  <style type="text/css">

  #outlook a { padding: 0; }
  .ReadMsgBody { width: 100%; }
  .ExternalClass { width: 100%; }
  .ExternalClass * { line-height:100%; }
	body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
	table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
  p {
    display: block;
    margin: 13px 0;
  }

  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:400,500,700,300);
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport { width:320px; }
      @viewport { width:320px; }
    }
  </style>
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:400,500,700,300" rel="stylesheet" type="text/css">
  <!--<![endif]-->
<style type="text/css">
    @media only screen and (min-width:480px) {
    .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
}</style></head>
<body id="YIELD_MJML" style="background: #29A7B8;"><div class="mj-body" style="background-color:#29A7B8;"><!--[if mso]>
  		<table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"><tr><td>
  		<![endif]--><div style="margin:0 auto;max-width:600px;"><table class="" cellpadding="0" cellspacing="0" style="width:100%;font-size:0px;" align="center"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0;padding:20px 0;"><!--[if mso]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="width:600px;">
      <![endif]--></td></tr><tr><td style="font-size:0;padding:15px 30px;" align="center"><table cellpadding="0" cellspacing="0" style="border:none;border-radius:3px;" align="center"><tbody><tr><td style="background:#0C8094;border-radius:3px;color:#ffffff;cursor:auto;" align="center" valign="middle" bgcolor="#0C8094"><a class="mj-content" href="${cbUrl}" style="display:inline-block;text-decoration:none;background:#0C8094;border:1px solid #0C8094;border-radius:3px;color:#ffffff;font-size:13px;font-weight:bold;padding:15px 30px;" target="_blank">Sign in to ${appName}</a></td></tr></tbody></table></td></tr><!--[if mso]>
      </td></tr></table>
      <![endif]--></tbody></table></div><!--[if mso]>
      </td></tr></table>
  		<![endif]-->
  		<!--[if mso]>
  		<table border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"><tr><td>
  		<![endif]--><div style="margin:0 auto;max-width:600px;"><table class="" cellpadding="0" cellspacing="0" style="width:100%;font-size:0px;" align="center"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0;padding:20px 0;"><!--[if mso]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="width:600px;">
      <![endif]--><div style="vertical-align:top;display:inline-block;font-size:13px;text-align:left;width:100%;" class="mj-column-per-100" aria-labelledby="mj-column-per-100"><table width="100%"><tbody><tr><td style="font-size:0;padding:10px 25px;" align="left"><div class="mj-content" style="cursor:auto;color:#EEE;font-family:helvetica;font-size:13px;line-height:22px;">You're receiving this message because someone used your Email address. Please ignore it if you didn't request to sign in to ${appName}.</div></td></tr></tbody></table></div><!--[if mso]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso]>
  		</td></tr></table>
  		<![endif]--></div></body>
</html>`;
}
