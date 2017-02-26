const {decodeUser, decodeAuth} = require('../tokens');

const ensure = {
  async auth(ctx, next) {
    if (!ctx.headers.hasOwnProperty('x-auth-token')) {
      ctx.throw(401);
    }

    try {
      ctx.state.auth = decodeAuth(ctx.headers['x-auth-token']);
    } catch (e) {
      ctx.throw(401);
    }

    await next();
  },

  async user(ctx, next) {
    if (!ctx.headers.hasOwnProperty('x-access-token')) {
      ctx.throw(401);
    }

    try {
      ctx.state.user = decodeUser(ctx.headers['x-access-token']);

      if (ctx.state.user.role === 'admin' && ctx.headers.hasOwnProperty('x-access-override')) {
        ctx.state.user = JSON.parse(ctx.headers['x-access-override']);
      }
    } catch (e) {
      ctx.throw(401);
    }

    await next();
  },

  role(role) {
    return async (ctx, next) => {
      await this.user(ctx, async function () {
        if (ctx.state.user.role !== role) {
          ctx.throw(403);
        } else {
          await next();
        }
      });
    }
  }
};

ensure.admin = ensure.role('admin');

module.exports = ensure;
