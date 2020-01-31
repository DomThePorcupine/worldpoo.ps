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
 *       "response": "stall not found"
 *     }
 *
 */
router.get('/:id', body(), auth(), async (ctx) => {
    const stall = await ctx.db.models.stall.findByPk(ctx.params.id, {
        attributes: ['address', 'name', 'createdAt'],
        include: [{
            model: ctx.db.models.tale,
            as: 'tales',
            attributes: ['taleText', 'username', 'id'],
        }, {
            model: ctx.db.models.rating,
            as: 'ratings',
            attributes: ['score'],
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
router.post('/', body(), auth(true), params(['address', 'name']), async (ctx) => {
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
