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


router.get('/random', async (ctx) => {
    const stalls = await ctx.db.models.stall.findAll({
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
        limit: 10,
    });

    ctx.body = stalls[Math.floor(Math.random() * stalls.length)] || {};
    ctx.staus = 200;
    return;
});

/**
 * @api {get} api/v1/stall/:id/noauth Get some basic info about a stall
 * @apiName GetNoAuthStall
 * @apiGroup Stall
 *
 * @apiParam {number} id The id of the stall
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "The name of the stall",
         "createdAt": "some date"
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
router.get('/:id/noauth', async (ctx) => {
    const stall = await ctx.db.models.stall.findByPk(ctx.params.id, {
        attributes: ['name', 'createdAt'],
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
 * @api {get} api/v1/stall/:id Get info about a stall
 * @apiName GetStall
 * @apiGroup Stall
 *
 * @apiParam {number} id The id of the stall
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
router.get('/:id', auth(), async (ctx) => {
    const stall = await ctx.db.models.stall.findByPk(ctx.params.id, {
        attributes: ['address', 'name', 'createdAt'],
        include: [{
            model: ctx.db.models.tale,
            as: 'tales',
            attributes: ['taleText', 'username', 'currentScore', 'id'],
            raw: true,
        }],
    });

    const [averageScore] = await ctx.db.models.rating.findAll({
        where: {
            StallId: ctx.params.id,
        },

        attributes: [[ctx.db.sequelize.fn('AVG', ctx.db.sequelize.col('score')), 'average']]
    });

    if (stall === null) {
        ctx.body = {
            response: 'not found',
        };

        ctx.status = 404;
        return;
    }

    const taleIds = stall.tales.map((tale) => { return tale.id });

    const taleVotes = await ctx.db.models.vote.findAll({
        where: {
            TaleId: taleIds,
            UserId: ctx.user.id,
        },
        attributes: ['TaleId']
    });
    const voteMap = {};

    taleVotes.forEach((vote) => {
        voteMap[vote.TaleId] = true;
    });



    const tales = [];

    for (let i = 0; i < stall.tales.length; i++) {
        let tmp = stall.tales[i].get();
        if (voteMap[String(stall.tales[i].id)] !== undefined) {
            tmp.myVote = voteMap[String(stall.tales[i].id)];
        }
        tales.push(tmp);
    }

    tales.sort((a, b) => { return b.currentScore - a.currentScore; })

    const [rating] = await ctx.db.models.rating.findAll({
        attributes: ['score'],
        where: {
            UserId: ctx.user.id,
            StallId: ctx.params.id,
        }
    });

    let myRating = null;

    if (rating !== undefined) {
        myRating = rating.score;
    }

    ctx.body = { address: stall.address, name: stall.name, tales, myRating, averageScore: Number(averageScore.get().average) };
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
router.post('/', body(), auth(true), params(['address', 'name', 'bathroomId']), async (ctx) => {
    const body = ctx.request.body;

    const nStall = await ctx.db.models.stall.create({
        address: body.address,
        name: body.name,
        BathroomId: body.bathroomId,
    });

    ctx.body = {
        response: nStall.id,
    };
    return;
});

router.delete('/:id', auth(true), async (ctx) => {
    const stall = await ctx.db.models.stall.findByPk(ctx.params.id);

    if (stall === null) {
        ctx.body = {
            response: 'not found'
        }
        ctx.status = 404;
        return;
    }
    await stall.destroy();
    ctx.body = {
        response: 'ok'
    }
    ctx.status = 200;
    return;
});


module.exports = router;
