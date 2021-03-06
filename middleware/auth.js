// -- Third party imports -- //
const jwt = require('jsonwebtoken');

// -- Constants -- //
const SECRET = process.env.JWT_SECRET || 'super-secret-i-really-like-cats';

module.exports = (admin = false) => {
    return async (ctx, next) => {
        if (ctx.cookie === undefined) {
            ctx.body = {
                response: 'unauthorized',
            };

            ctx.status = 403;
            return;
        }

        const token = ctx.cookie.token;

        // Make sure the request has come in with a token
        if (token === undefined) {
            ctx.body = {
                response: 'unauthorized',
            };

            ctx.status = 403;
            return;
        }

        // Check for invalid signature and handle
        try {
            const vtoken = jwt.verify(token, SECRET);
            const user = await ctx.db.models.user.findByPk(vtoken.userId);

            console.log(`Checking permissions for user with info: ${JSON.stringify(vtoken)}`);

            if (admin) {
                if (!vtoken.admin) {
                    ctx.body = {
                        response: 'unauthorized',
                    };

                    ctx.status = 403;
                    return;
                }
            }


            ctx.user = user;
            await next();
        } catch (err) {
            console.log('Given a bad token');
            console.log(err);

            ctx.body = {
                response: 'unauthorized',
            };

            ctx.status = 403;
            return;
        }
    };
};
