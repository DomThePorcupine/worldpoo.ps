// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');
const bcrypt = require('bcrypt');

// -- Local imports -- //
const params = require('../middleware/params');
const auth = require('../middleware/auth');
const { SIGN_UP } = require('../constants');

const router = new Router({
    prefix: '/user',
});

/**
 * @api {post} v1/user/register Register as a new user
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {string} username The new username
 * @apiParam {string} password The new password
 *
 * @apiSuccess {String} response The response string
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "ok"
 *     }
 *
 * @apiError UsernameExists The username is already taken
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "response": "username already exists."
 *     }
 */
router.post('/register', body(), params(['username', 'password']), async (ctx) => {
    const body = ctx.request.body;

    const user = await ctx.db.models.user.findAll({ where: { username: body.username } });

    if (user.length > 0) {
        ctx.body = {
            response: 'username already exists.',
        };

        ctx.status = 400;
        return;
    }

    const hsh = bcrypt.hashSync(body.password, 10);

    await ctx.db.models.user.create({
        username: body.username,
        password: hsh,
    });

    ctx.db.track(SIGN_UP, { username: body.username });

    ctx.body = {
        response: 'ok',
    };

    return;
});

router.get('/whois', auth(), async (ctx) => {

    ctx.body = {
        username: ctx.user.username,
    };

    return;
});


/**
 * @api {put} v1/user/ Update a user's info
 * @apiName Update
 * @apiGroup User
 *
 * @apiParam {boolean} vip Is this user a vip
 * @apiParam {boolean} admin Is this user an admin
 * @apiParam {number} userId The id of the user to update
 *
 * @apiSuccess {String} response The response string
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "ok"
 *     }
 *
 * @apiError UsernameExists The username is already taken
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "response": "failure"
 *     }
 */
router.put('/', body(), auth(true), params(['vip', 'userId', 'admin']), async (ctx) => {
    const body = ctx.request.body;

    const user = await ctx.db.models.user.findByPk(body.userId);

    if (!user) {
        ctx.body = {
            response: 'failure',
        };

        ctx.status = 400;
        return;
    }

    // Set the vip and admin bools
    user.vip = body.vip;
    user.admin = body.admin;

    // Save the changes
    await user.save();

    ctx.body = {
        response: 'ok',
    };

    ctx.status = 200;
    return;
});


module.exports = router;
