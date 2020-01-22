// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');

// -- Local imports -- //
const auth = require('../middleware/auth');
const params = require('../middleware/params');

// -- Constants -- //
const router = new Router({
    prefix: '/stall',
});


router.get('/:id', body(), auth(), async (ctx) => {
    const stall = await ctx.db.models.stall.findByPk(ctx.params.id, {
        attributes: ['address', 'name'],
        include: [{
            model: ctx.db.models.tale,
            as: 'tales',
            attributes: ['taleText', 'username'],
        }, {
            model: ctx.db.models.rating,
            as: 'ratings',
            attributes: ['review', 'score'],
        }],
    });

    if (stall === null) {
        ctx.body = {
            response: 'not found',
        };

        ctx.status = 404;
        return;
    }

    ctx.body = stall;
    return;
});

router.post('/', body(), auth(), params(['address', 'name']), async (ctx) => {
    const body = ctx.request.body;

    const nStall = await ctx.db.models.stall.create({
        address: body.address,
        name: body.name,
    });

    ctx.body = {
        response: nStall.id,
    };
    return;
});

module.exports = router;
