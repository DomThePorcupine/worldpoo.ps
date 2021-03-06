// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');

// -- Local imports -- //
const auth = require('../middleware/auth');
const params = require('../middleware/params');
const { STALL_RATING } = require('../constants');

// -- Constants -- //
const router = new Router({
    prefix: '/rating',
});


/**
 * @api {post} /v1/rating Rate a stall
 * @apiName Rate
 * @apiGroup Rating
 *
 * @apiParam {number} stallId The stall to give a rating to
 * @apiParam {number} score The score to give this stall
 *
 * @apiSuccess {String} response The response string
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "response": "success"
 *     }
 *
 * @apiError InvalidStall The stall does not exist
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "response": "stall not found"
 *     }
 *
 * @apiError InvalidScore The score given is not between 0 and 5
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "response": "invalid score"
 *     }
 *
 * @apiError ReviewAlreadyGiven This user has already reviewed this stall
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "response": "you have already given a review"
 *     }
 */
router.post('/', body(), auth(), params(['score', 'stallId']), async (ctx) => {
    const body = ctx.request.body;

    // Force score to be a number
    body.score = Number(body.score);


    const stall = await ctx.db.models.stall.findByPk(body.stallId);

    if (stall === null) {
        ctx.body = {
            response: 'stall not found',
        };

        ctx.status = 404;
        return;
    }

    // Check the score is between 0 and 5
    if (body.score < 0 || body.score > 5) {
        ctx.body = {
            response: 'invalid score',
        };

        ctx.status = 400;
        return;
    }

    const [oldRating] = await ctx.user.getRatings({
        where: {
            StallId: stall.id, // Can only be one
        }
    });


    if (oldRating) {

        oldRating.score = body.score;
        await oldRating.save();
        ctx.db.track(STALL_RATING, { stall: stall.name, rating: body.score });
        ctx.body = {
            response: 'review updated',
        };

        ctx.status = 200;
        return;
    }


    await ctx.db.models.rating.create({
        score: body.score,
        StallId: stall.id,
        UserId: ctx.user.id,
    });

    // Make the associations
    // await stall.addRating(nRating);
    // await ctx.user.addRating(nRating);

    ctx.db.track(STALL_RATING, { stall: stall.name, rating: body.score });


    ctx.body = {
        response: 'success',
    };

    return;
});


module.exports = router;
