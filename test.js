const Database = require('./db');

const db = new Database();

db.on('ready', async () => {
    const t = await db.models.user.findAll();
    console.log(t);
});
