// -- Third party imports -- //
const Router = require('koa-router');

// -- Local imports -- //
const story = require('./story');
const version = require('./version');
const auth = require('./auth');

const router = new Router({
    prefix: '/api/v1',
});

router.use(story.routes());
router.use(version.routes());
router.use(auth.routes());


module.exports = router;
