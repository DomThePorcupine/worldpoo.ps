// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// -- Local imports -- //
const params = require('../middleware/params');

// -- Constants -- //
const SECRET = process.env.JWT_SECRET || 'super-secret-i-really-like-cats';

const router = new Router({
    prefix: '/auth',
});

/**
 * @api {post} api/v1/auth/login Login as a user
 * @apiName Login
 * @apiGroup Auth
 *
 * @apiParam {string} username The username
 * @apiParam {string} password The password
 *
 * @apiSuccess {String} response The response string
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "success"
 *     }
 *
 * @apiError InvalidCredentials The username / password combo is invalid
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "response": "failure"
 *     }
 */
router.post('/login', body(), params(['username', 'password']), async (ctx) => {
    const body = ctx.request.body;

    const [user] = await ctx.db.models.user.findAll({ where: { username: body.username } });

    const match = await bcrypt.compare(body.password, user.password);

    if (match) {
        ctx.cookies.set('token', jwt.sign({
            userId: user.id,
            username: user.username,
            vip: user.vip,
            admin: user.admin,
        }, SECRET));
        ctx.body = {
            response: 'success',
        };
        return;
    }

    ctx.body = {
        response: 'failure',
    };

    ctx.status = 403;

    return;
});

module.exports = router;
