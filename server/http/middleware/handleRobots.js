import config from 'config';

export default function (app){
  const robotsTxt = 'User-agent: *\n' +
                  config.get('robots');
  app.get('/robots.txt', function (req, res) {
    res.set('Content-Type', 'text/plain');
    res.send(robotsTxt);
  });
}
