// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');

// -- Local imports -- //
const auth = require('../middleware/auth');
const params = require('../middleware/params');

const router = new Router({
    prefix: '/vote',
});


/**
 * @api {post} api/v1/vote Register a vote
 * @apiName CastVote
 * @apiGroup Vote
 *
 * @apiParam {number} stallId The new username
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
 * @apiError UserAlreadyVoted The user has already voted on this tale
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "response": "already voted"
 *     }
 * @apiError StallDoesNotExist The given stall does not exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request
 *     {
 *       "response": "no stall"
 *     }
 */
router.post('/', auth(), body(), params(['stallId', 'vote']), async (ctx) => {
    const body = ctx.request.body;
    const oldVote = await ctx.db.models.vote.findAll({ where: {
        stallId: body.stallId,
        userId: ctx.user.id,
    } });

    if (oldVote) {
        ctx.body = {
            response: 'already voted',
        };

        ctx.status = 400;
        return;
    }

    const stall = await ctx.db.models.stall.findByPk(body.stallId);

    if (!stall) {
        ctx.body = {
            response: 'no stall',
        };

        ctx.status = 404;
        return;
    }
    const nVote = await ctx.db.models.vote.create({
        vote: Boolean(body.vote), // Force boolean
    });

    await ctx.user.addVote(nVote);
    await stall.addVote(nVote);

    ctx.body = {
        response: 'ok',
    };

    ctx.status = 200;

    return;
});

module.exports = router;
