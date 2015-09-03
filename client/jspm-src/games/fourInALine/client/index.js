import Master from '../master/index';
import AbstractGameClient from '../../abstract/client/index';

export default class FourInALineGameClient extends AbstractGameClient {
  constructor() {
    super(Master);
  }
}
