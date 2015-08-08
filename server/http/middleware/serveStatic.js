import config from 'config';
import express from 'express';

export default function (app) {
  if (config.util.getEnv('NODE_ENV') === 'production') {
    app.use(express.static(config.get('paths.client') + '/jspm-sfx'));
  }
  // for now we always allow access to development files
  app.use(express.static(config.get('paths.client') + '/jspm-src'));
}
