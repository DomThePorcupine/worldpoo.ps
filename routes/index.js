// -- Third party imports -- //
const Router = require('koa-router');

// -- Local imports -- //
const tale = require('./tale');
const version = require('./version');
const auth = require('./auth');
const stall = require('./stall');
const rating = require('./rating');
const user = require('./user');
const vote = require('./vote');
const bathroom = require('./bathroom');

const router = new Router({
    prefix: '/v1',
});

router.use(tale.routes());
router.use(version.routes());
router.use(auth.routes());
router.use(stall.routes());
router.use(rating.routes());
router.use(user.routes());
router.use(vote.routes());
router.use(bathroom.routes());

module.exports = router;
