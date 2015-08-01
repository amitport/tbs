import * as httpFactory from 'http';
import expressAppBuilder from './expressAppBuilder';

export default function http() {
  return httpFactory.createServer(
    expressAppBuilder()
      .configureSecurity()
      .handleRobots()
      .log()
      // TODO serve-favicon middleware
      .compress()
      .serveFonts()
      .render()
      .parseBody()
      // TODO API routes
      .serveStatic()
      .handleErrors()
    .build()
  );
}
