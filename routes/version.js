// -- Third party imports -- //
const Router = require('koa-router');

const VERSION = require('../package.json').version;

const router = new Router({
    prefix: '/version',
});

router.get('/', (ctx) => {
    ctx.body = {
        version: VERSION,
    };
});

module.exports = router;
