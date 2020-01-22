// -- Third party imports -- //
const Koa = require('koa');
const logger = require('koa-logger');
const cookie = require('koa-cookie').default;

// -- Local imports -- //
const routes = require('./routes');
const Database = require('./db');

const app = new Koa();
const db = new Database(true);

app.use(logger());
app.use(cookie());

app.use(async (ctx, next) => {
    ctx.db = db;
    await next();
});

app.use(routes.routes());

module.exports = app;
