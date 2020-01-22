// -- Third party imports -- //
const jwt = require('jsonwebtoken');

// -- Constants -- //
const SECRET = process.env.JWT_SECRET || 'super-secret-i-really-like-cats';

module.exports = () => {
    return async (ctx, next) => {
        // Token can either come from a cookie or a body field
        const token = req.cookies.token;

        // Make sure the request has come in with a token
        if (token === undefined) {
            // For now also accept tokens passed in the body
            ctx.body = {
                response: 'unauthorized',
            };

            ctx.status = 403;
            return;
        }

        // Check for invalid signature and handle
        try {
            const vtoken = jwt.verify(token, SECRET);
            const user = await req.db.models.user.findByPk(vtoken.userid);

            console.log(`Checking permissions for user with id: ${vtoken.userid}`);
            console.log(`Is user admin: ${user.admin}`);


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
