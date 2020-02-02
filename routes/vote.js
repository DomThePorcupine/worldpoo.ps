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
 * @apiParam {number} taleId The tale to vote on
 * @apiParam {boolean} vote true if upvote, false if downvote
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
 * @apiError TaleDoesNotExist The given tale does not exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request
 *     {
 *       "response": "no tale"
 *     }
 */
router.post('/', auth(), body(), params(['taleId', 'vote']), async (ctx) => {
    const body = ctx.request.body;

    // Force what was sent to be a boolean
    body.vote = Boolean(body.vote);


    const oldVote = await ctx.db.models.vote.findAll({
        where: {
            TaleId: body.taleId,
            UserId: ctx.user.id,
        }
    });

    if (oldVote.length > 0) {
        ctx.body = {
            response: 'already voted',
        };

        ctx.status = 400;
        return;
    }

    const tale = await ctx.db.models.tale.findByPk(body.taleId);

    if (!tale) {
        ctx.body = {
            response: 'no tale',
        };

        ctx.status = 404;
        return;
    }

    // adjust score based on this vote
    tale.currentScore = body.vote ? 1 : -1;
    await tale.save();

    // Finally record the vote
    await ctx.db.models.vote.create({
        vote: body.vote, // Force boolean
        UserId: ctx.user.id,
        TaleId: tale.id,
    });

    ctx.body = {
        response: 'ok',
    };

    ctx.status = 200;

    return;
});

module.exports = router;
