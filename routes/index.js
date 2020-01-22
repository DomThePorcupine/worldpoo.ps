// -- Third party imports -- //
const Router = require('koa-router');

// -- Local imports -- //
const story = require('./story');

const router = new Router({
    prefix: '/api/v1',
});

router.use(story.routes());


module.exports = router;
