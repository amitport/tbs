import config from 'config';
import path from 'path';
const clientPath = config.get('paths.client');

export default function clientRelative(rel) {
  return path.join(clientPath, rel);
}
