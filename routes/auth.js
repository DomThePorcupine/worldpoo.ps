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

router.post('/signup', body(), params(['username', 'password']), async (ctx) => {
    const body = ctx.request.body;

    const user = await ctx.db.models.user.findAll({ where: { username: body.username } });

    if (user.length > 0) {
        ctx.body = {
            response: 'username already exists.',
        };

        ctx.status = 500;
        return;
    }

    const hsh = bcrypt.hashSync(body.password, 10);

    await ctx.db.models.user.create({
        username: body.username,
        password: hsh,
    });


    ctx.body = {
        response: 'ok',
    };

    return;
});

router.post('/login', body(), params(['username', 'password']), async (ctx) => {
    const body = ctx.request.body;

    const [user] = await ctx.db.models.user.findAll({ where: { username: body.username } });

    const match = await bcrypt.compare(body.password, user.password);

    if (match) {
        ctx.cookies.set('token', jwt.sign({ userid: user.id, username: user.username }, SECRET));
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
