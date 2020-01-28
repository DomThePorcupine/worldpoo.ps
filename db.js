// -- Third party imports -- //
const Sequelize = require('sequelize');
const { EventEmitter } = require('events');
const bcrypt = require('bcrypt');

// -- Local imports -- //
const user = require('./models/user');
const tale = require('./models/tale');
const stall = require('./models/stall');
const rating = require('./models/rating');


// -- Constants -- //
const DB_URL = process.env.DATABASE_URL || 'postgres://pooper:vsecure-password@0.0.0.0:5432/wpoops';
const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'vsecure-lmao';

module.exports = class Database extends EventEmitter {
    /**
 * Default constructor
 *
 * @param {boolean} force - When booting, should we drop all existing tables first
 */
    constructor (force = false) {
        super(); // For event emitter

        this.sequelize = new Sequelize(DB_URL);

        this.models = {};

        this.sequelize.authenticate()
            .then(async () => {
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

                // Create default users
                const admin = await this.models.user.findAll({ where: { username: DEFAULT_USERNAME } });

                if (admin.length === 0) {
                    await this.models.user.create({
                        username: DEFAULT_USERNAME,
                        password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
                        vip: true,
                    });
                }

                this.emit('ready'); // Let everything know we are good to go
            }).catch((err) => {
                console.log('Error connecting to the db');
                console.log(err);
            });
    }
};
