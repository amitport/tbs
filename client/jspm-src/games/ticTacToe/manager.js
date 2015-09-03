export default {
  onGameEnd(result, session) {
    if (result === 'tie') {
      session.result = 'tie';
    } else {
      if (result === 'c0') {
        session.result = {c1: 0, r1: 0, c2: 0, r2: 2};
      }
      if (result === 'c1') {
        session.result = {c1: 1, r1: 0, c2: 1, r2: 2};
      }
      if (result === 'c2') {
        session.result = {c1: 2, r1: 0, c2: 2, r2: 2};
      }
      if (result === 'r0') {
        session.result = {c1: 0, r1: 0, c2: 2, r2: 0};
      }
      if (result === 'r1') {
        session.result = {c1: 0, r1: 1, c2: 2, r2: 1};
      }
      if (result === 'r2') {
        session.result = {c1: 0, r1: 2, c2: 2, r2: 2};
      }
      if (result === 'd0') {
        session.result = {c1: 0, r1: 0, c2: 2, r2: 2};
      }
      if (result === 'd1') {
        session.result = {c1: 0, r1: 2, c2: 2, r2: 0};
      }
    }
  }
}
