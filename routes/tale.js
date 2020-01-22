// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');

// -- Local imports -- //
const auth = require('../middleware/auth');
const params = require('../middleware/params');

const router = new Router({
    prefix: '/tale',
});

router.post('/', body(), auth(), params(['taleText', 'stallid']), async (ctx) => {
    const body = ctx.request.body;

    if (body.taleText.length > 254) {
        ctx.body = {
            response: 'failure',
            reason: 'Tale too long, please keep them less than 255 characters',
        };
        ctx.status = 400;
        return;
    }

    const stall = await ctx.db.models.stall.findByPk(body.stallid);

    if (stall === null) {
        ctx.body = {
            response: 'stall not found.',
        };

        ctx.status = 400;
        return;
    }

    const nTale = await ctx.db.models.tale.create({
        taleText: body.taleText,
        username: ctx.user.username,
    });

    await ctx.user.addTale(nTale);
    await stall.addTale(nTale);

    ctx.body = {
        response: nTale.id,
    };
    return;
});

router.get('/:id', auth(), async (ctx) => {
    const tale = await ctx.db.models.tale.findByPk(ctx.params.id);

    if (tale === null) {
        ctx.body = {
            response: 'not found',
        };

        ctx.status = 404;
        return;
    }
    ctx.body = {
        tale,
    };
    return;
});

module.exports = router;
