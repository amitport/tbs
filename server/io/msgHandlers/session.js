import Room from '../../game/room';

export function action(msg) {
  const room = Room.get(msg.roomId);
  room.session[msg.actionId](msg.payload);

  room.broadcastUpdate();
}
