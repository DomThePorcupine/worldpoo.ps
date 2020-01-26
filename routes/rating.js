// -- Third party imports -- //
const Router = require('koa-router');
const body = require('koa-bodyparser');

// -- Local imports -- //
const auth = require('../middleware/auth');
const params = require('../middleware/params');


// -- Constants -- //
const router = new Router({
    prefix: '/rating',
});


router.post('/', body(), auth(), params(['score', 'review', 'stallid']), async (ctx) => {
    const body = ctx.request.body;

    const stall = await ctx.db.models.stall.findByPk(body.stallid);

    if (stall === null) {
        ctx.body = {
            response: 'stall not found',
        };

        ctx.status = 404;
        return;
    }

    const ratings = await ctx.user.getRatings({ where: { StallId: stall.id } });

    if (ratings.length > 0) {
        ctx.body = {
            response: 'you have already given a review',
        };

        ctx.status = 400;
        return;
    }

    const nRating = await ctx.db.models.rating.create({
        score: Number(body.score), // Force numbers
        review: body.review,
    });

    stall.addRating(nRating);
    ctx.user.addRating(nRating);

    ctx.body = {
        response: nRating.id,
    };

    return;
});


module.exports = router;
