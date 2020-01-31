// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');

// -- Local imports -- //
const auth = require('../middleware/auth');
const params = require('../middleware/params');

const router = new Router({
    prefix: '/tale',
});


/**
 * @api {get} api/v1/tale/new Get a list of the most recent tales
 * @apiName GetNewTales
 * @apiGroup Tale
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "success"
 *     }
 *
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "response": "tale not found"
 *     }
 *
 */
router.get('/new', auth(), async (ctx) => {
    const tales = await ctx.db.models.tale.findAll({
        attributes: ['currentScore', 'taleText', 'createdAt', 'id', 'username'],
        limit: 10,
        order: [['createdAt', 'DESC']],
    });

    ctx.body = {
        tales,
    };

    ctx.status = 200;
    return;
});

/**
 * @api {get} api/v1/tale/:id Get info on a tale
 * @apiName GetTale
 * @apiGroup Tale
 *
 * @apiParam {number} id
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "currentScore": 1234,
 *       "taleText": "An example tale",
 *       "stalls": [{
 *          "address": "1306 E Carson St, Pittsburgh, PA 15203",
 *          "name": "Smiling moose"
 *       }],
 *     }
 *
 * @apiError TaleDoesNotExist A tale with that id does not exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "response": "tale not found"
 *     }
 *
 */
router.get('/:id', auth(), async (ctx) => {
    const tale = await ctx.db.models.tale.findByPk(ctx.params.id, {
        attributes: ['currentScore', 'taleText', 'createdAt'],
        include: [{
            model: ctx.db.models.stall,
            as: 'stall',
            attributes: ['address', 'name'],
        }, {
            model: ctx.db.models.user,
            as: 'user',
            attributes: ['username'],
        }],
    });

    // If the tale doesn't exist give a 404
    if (!tale) {
        ctx.body = {
            response: 'tale not found',
        };

        ctx.status = 404;
        return;
    }

    ctx.body = tale;
    return;
});

/**
 * @api {post} api/v1/tale Post a tale
 * @apiName CreateTale
 * @apiGroup Tale
 *
 * @apiParam {string} taleText The text for the tale
 * @apiParam {number} stallId The id of the stall this tale belongs to
 *
 * @apiSuccess {String} response The response string
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "success"
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
 * @apiError TaleTextTooLong The tale is too long
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "response": "failure",
 *       "reason": "Tale too long, please keep them less than 560 characters"
 *     }
 */
router.post('/', body(), auth(), params(['taleText', 'stallId']), async (ctx) => {
    const body = ctx.request.body;

    if (body.taleText.length > 560) {
        ctx.body = {
            response: 'failure',
            reason: 'Tale too long, please keep them less than 560 characters',
        };
        ctx.status = 400;
        return;
    }

    const stall = await ctx.db.models.stall.findByPk(body.stallId);

    if (stall === null) {
        ctx.body = {
            response: 'stall not found',
        };

        ctx.status = 400;
        return;
    }

    await ctx.db.models.tale.create({
        taleText: body.taleText,
        username: ctx.user.username,
        UserId: ctx.user.id,
        StallId: stall.id,
    });

    ctx.body = {
        response: 'success',
    };
    return;
});

module.exports = router;
