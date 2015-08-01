import requireDir from 'require-dir';
import express from 'express';

const middleware = requireDir('./middleware');

export default function expressAppBuilder() {
  const app = express();
  const _middlewareBuilder = {};
  for (var key in middleware) {
    if (middleware.hasOwnProperty(key)) {
      const handler = middleware[key];
      _middlewareBuilder[key] = function () {
        handler(app);
        return this;
      };
    }
  }

  _middlewareBuilder.build = function () {
    return app;
  };
  return _middlewareBuilder;
}
