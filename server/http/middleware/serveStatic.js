import config from 'config';
import express from 'express';

export default function (app) {
  app.use(express.static(config.get('paths.client') + '/jspm-src'));
}
