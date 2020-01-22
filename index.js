// -- Local imports -- //
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server up and running on port: ${PORT}`);
});
