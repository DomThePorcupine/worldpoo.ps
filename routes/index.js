// -- Third party imports -- //
const Router = require('koa-router');

// -- Local imports -- //
const tale = require('./tale');
const version = require('./version');
const auth = require('./auth');
const stall = require('./stall');
const rating = require('./rating');

const router = new Router({
    prefix: '/api/v1',
});

router.use(tale.routes());
router.use(version.routes());
router.use(auth.routes());
router.use(stall.routes());
router.use(rating.routes());


module.exports = router;
