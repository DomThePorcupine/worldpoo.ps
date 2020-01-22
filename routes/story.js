// -- Third party imports -- //
const Router = require('koa-router');

const router = new Router({
    prefix: '/story',
});

router.get('/:id', (ctx) => {
    ctx.body = {
        response: 'ok',
    };
    return;
});

module.exports = router;
