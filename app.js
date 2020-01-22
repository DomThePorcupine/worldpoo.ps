// -- Third party imports -- //
const Koa = require('koa');
const logger = require('koa-logger');

// -- Local imports -- //
const routes = require('./routes');

const app = new Koa();

app.use(logger());

app.use(routes.routes());

module.exports = app;
