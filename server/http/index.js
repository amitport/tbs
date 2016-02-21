import config from 'config';
import path from 'path';
const clientPath = config.get('paths.client');
function clientRelative(rel) {
  return path.join(clientPath, rel);
}

import usefulHttpBuilder from 'useful-http';

export default function http() {
  return usefulHttpBuilder()
    .configureSecurity({})
    .handleRobots({disallow: config.get('robotsDisallow')})
    .log({stream: config.get('httpLogStream')})
    // TODO serve-favicon middleware
    .compress()
    .serveFonts()
    .renderIndex({clientRoutes: [], serverPagesDir: clientRelative('server-views')})
    .parseBody()
    // TODO API routes
    .serveStatic({dirs:
      [clientRelative('jspm-sfx'), clientRelative('jspm-src')]})
    .handleErrors()
  .build();
}
