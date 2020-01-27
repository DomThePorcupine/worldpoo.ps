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

    const nTale = await ctx.db.models.tale.create({
        taleText: body.taleText,
        username: ctx.user.username,
    });

    await ctx.user.addTale(nTale);
    await stall.addTale(nTale);

    ctx.body = {
        response: 'success',
    };
    return;
});

module.exports = router;
