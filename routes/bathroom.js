// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');
const _ = require('lodash');

// -- Local imports -- //
const auth = require('../middleware/auth');
const params = require('../middleware/params');

// -- Constants -- //
const router = new Router({
    prefix: '/bathroom',
});

router.get('/random', async (ctx) => {
    const bathrooms = await ctx.db.models.bathroom.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit: 10,
    });

    ctx.body = bathrooms[Math.floor(Math.random() * bathrooms.length)] || {};
    ctx.staus = 200;
    return;
});

router.get('/:id/noauth', async (ctx) => {
    const bathroom = await ctx.db.models.bathroom.findByPk(ctx.params.id, {
        attributes: ['name', 'createdAt'],
    });

    if (bathroom === null) {
        ctx.body = {
            response: 'not found',
        };

        ctx.status = 404;
        return;
    }

    ctx.body = bathroom;
    return;
});



/**
 * @api {get} api/v1/stall/:id Get info about a stall
 * @apiName GetStall
 * @apiGroup Stall
 *
 * @apiParam {number} id The id of the stall
 *
 * @apiSuccess {String} response The response string
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "address": "Some Address on some floor",
 *       "name": "The name of the stall",
 *       "tales": [{
 *          "taleText": "Here is an example tale",
 *          "username": "dom"
 *       }],
 *       "ratings": [{
 *          "score": 2
 *       }]
 *     }
 *
 * @apiError StallDoesNotExist A stall with that id does not exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "response": "not found"
 *     }
 *
 */
router.get('/:id', auth(), async (ctx) => {
    const bathroom = await ctx.db.models.bathroom.findByPk(ctx.params.id, {
        attributes: ['name', 'createdAt'],
        include: [{
            model: ctx.db.models.stall,
            as: 'stalls',
            attributes: ['name', 'id'],
            raw: true,
        }],
    });

    if (bathroom === null) {
        ctx.body = {
            response: 'not found',
        };

        ctx.status = 404;
        return;
    }

    ctx.body = { bathroom };
    ctx.status = 200;
    return;
});

router.get('/:id/feed', auth(), async (ctx) => {
    const bathroom = await ctx.db.models.bathroom.findByPk(ctx.params.id, {
        attributes: ['name', 'createdAt'],
        include: [{
            model: ctx.db.models.stall,
            as: 'stalls',
            attributes: ['id'],
        }],
    });

    const stallIds = bathroom.stalls.map((stall) => { return stall.id });

    const stalls = await ctx.db.models.stall.findAll({
        where: {
            id: stallIds,
        },
        include: [{
            model: ctx.db.models.tale,
            as: 'tales',
            attributes: ['taleText', 'username', 'currentScore', 'id', 'createdAt'],
        }]
    });

    const tales = _.flatMap(stalls, (stall) => { return stall.tales });

    ctx.body = { tales };
    ctx.status = 200;
    return;
});


/**
 * @api {post} api/v1/stall Create a new stall (Requires admin)
 * @apiName CreateStall
 * @apiGroup Stall
 *
 * @apiParam {string} address The address of the stall (can have extra info like floor #)
 * @apiParam {string} name The stall name
 *
 * @apiSuccess {number} response The stall id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": 1
 *     }
 *
 */
router.post('/', body(), auth(true), params(['name']), async (ctx) => {
    const body = ctx.request.body;

    const nBathroom = await ctx.db.models.bathroom.create({
        name: body.name,
    });

    ctx.body = {
        response: nBathroom.id,
    };
    ctx.status = 200;
    return;
});

router.delete('/:id', auth(true), async (ctx) => {
    const bathroom = await ctx.db.models.bathroom.findByPk(ctx.params.id);

    if (bathroom === null) {
        ctx.body = {
            response: 'not found'
        }
        ctx.status = 404;
        return;
    }

    await bathroom.destroy();
    ctx.body = {
        response: 'ok'
    }
    ctx.status = 200;
    return;
});

module.exports = router;
