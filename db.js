// -- Third party imports -- //
const Sequelize = require('sequelize');
const { EventEmitter } = require('events');

// -- Local imports -- //
const user = require('./models/user');
const tale = require('./models/tale');
const stall = require('./models/stall');
const rating = require('./models/rating');


// -- Constants -- //
const DB_URL = process.env.DATABASE_URL || 'postgres://pooper:vsecure-password@0.0.0.0:5432/wpoops';


module.exports = class Database extends EventEmitter {
    /**
 * Default constructor
 *
 * @param {boolean} force - When booting, should we drop all existing tables first
 */
    constructor(force = false) {
        super(); // For event emitter

        this.sequelize = new Sequelize(DB_URL);

        this.models = {};

        this.sequelize.authenticate()
            .then(() => {
                console.log('Connected to the db!');

                // Set up the required models
                this.models.user = user(this.sequelize, Sequelize.DataTypes);
                this.models.tale = tale(this.sequelize, Sequelize.DataTypes);
                this.models.rating = rating(this.sequelize, Sequelize.DataTypes);
                this.models.stall = stall(this.sequelize, Sequelize.DataTypes);


                // Set up the associations
                this.models.rating.associate({ User: this.models.user, Stall: this.models.stall });
                this.models.user.associate({ Tale: this.models.tale, Rating: this.models.rating });
                this.models.tale.associate({ User: this.models.user, Stall: this.models.stall });
                this.models.stall.associate({ Tale: this.models.tale, Rating: this.models.rating });

                // For development purposes leave this on. Eventually should create
                // migrations
                this.sequelize.sync({ force }).then(() => {
                    this.emit('ready'); // Let everything know we are good to go
                });
            }).catch((err) => {
                console.log('Error connecting to the db');
                console.log(err);
            });
    }
};
