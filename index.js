require('dotenv').config();
// -- Third party imports -- //
const Koa = require('koa');
const logger = require('koa-logger');
const cookie = require('koa-cookie').default;
const serve = require('koa-static');
const cors = require('@koa/cors');

// -- Local imports -- //
const routes = require('./routes');
const Database = require('./db');

// -- Constants -- //
const PORT = process.env.PORT || 5000;
const app = new Koa();
const db = new Database(false); // Dont constantly delete everything

app.use(cors({ credentials: true }));
app.use(logger());
app.use(cookie());

app.use(async (ctx, next) => {
    ctx.db = db;
    await next();
});

app.use(routes.routes());

app.use(serve('./pub'));

db.on('ready', () => {
    app.emit('ready');
});

app._server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server up and running on port: ${PORT}`);
});

module.exports = app;
