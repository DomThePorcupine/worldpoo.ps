// -- Third party imports -- //
const Sequelize = require('sequelize');
const { EventEmitter } = require('events');
const bcrypt = require('bcrypt');
const moment = require('moment');
const mailgun = require("mailgun-js");

// -- Local imports -- //
const user = require('./models/user');
const tale = require('./models/tale');
const stall = require('./models/stall');
const rating = require('./models/rating');
const vote = require('./models/vote');
const bathroom = require('./models/bathroom');
const metric = require('./models/metric');
const { SIGN_UP, TALE_POST, TALE_VOTE,
    STALL_RATING, CODE_SCANNED } = require('./constants');

// -- Constants -- //
const DB_URL = process.env.DATABASE_URL || 'postgres://pooper:vsecure-password@0.0.0.0:5432/wpoops';
const DEFAULT_USERNAME = process.env.DEFAULT_USERNAME || 'admin';
const DEFAULT_PASSWORD = process.env.DEFAULT_PASSWORD || 'vsecure-lmao';
const EMAILS = process.env.EMAILS || 'dominic.dipasquale@gmail.com';
const MG_DOMAIN = process.env.MG_DOMAIN || 'sandbox7bc0137023ae45a4a0a1238885f2f726.mailgun.org';
const MG_API_KEY = process.env.MG_API_KEY;
const EVENTS = [SIGN_UP, TALE_POST, TALE_VOTE, STALL_RATING, CODE_SCANNED];

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
            .then(async () => {
                console.log('Connected to the db!');

                // Set up the required models
                this.models.user = user(this.sequelize, Sequelize.DataTypes);
                this.models.tale = tale(this.sequelize, Sequelize.DataTypes);
                this.models.rating = rating(this.sequelize, Sequelize.DataTypes);
                this.models.stall = stall(this.sequelize, Sequelize.DataTypes);
                this.models.vote = vote(this.sequelize, Sequelize.DataTypes);
                this.models.bathroom = bathroom(this.sequelize, Sequelize.DataTypes);
                this.models.metric = metric(this.sequelize, Sequelize.DataTypes);


                // Set up the associations
                this.models.rating.associate({ User: this.models.user, Stall: this.models.stall });
                this.models.user.associate({ Tale: this.models.tale, Rating: this.models.rating });
                this.models.tale.associate({ User: this.models.user, Stall: this.models.stall });
                this.models.stall.associate({ Tale: this.models.tale, Rating: this.models.rating, Bathroom: this.models.bathroom });
                this.models.vote.associate({ User: this.models.user, Tale: this.models.tale });
                this.models.bathroom.associate({ Stall: this.models.stall });

                this.sequelize.sync().then(async () => {
                    // Create default users
                    const admin = await this.models.user.findAll({ where: { username: DEFAULT_USERNAME } });

                    if (admin.length === 0) {
                        await this.models.user.create({
                            username: DEFAULT_USERNAME,
                            password: bcrypt.hashSync(DEFAULT_PASSWORD, 10),
                            vip: true,
                            admin: true,
                        });
                    }

                    this.emit('ready'); // Let everything know we are good to go
                });
            }).catch((err) => {
                console.log('Error connecting to the db');
                console.log(err);
            });
    }


    async track (event, info) {
        if (EVENTS.indexOf(event) < 0) {
            console.log(event + ' is not a valid event')
            return; // Not a valid event
        }
        let [today] = await this.models.metric.findAll({
            where: {
                createdAt: {
                    $and: [
                        { $gte: moment().startOf('day') },
                        { $lt: moment().endOf('day') }
                    ]
                }
            }
        });
        let message = 'Default message';

        // If there isn't one already in the db create one
        if (!today) {
            today = await this.models.metric.create({});
        }

        switch (event) {
            case SIGN_UP:
                today.signups = (today.signups + 1);
                message = 'A new user just signed up with username: ' + info.username;
                break;
            case TALE_POST:
                today.talesCreated = (today.talesCreated + 1);
                message = 'A new tale was just post on stall ' + info.stall + ' in bathroom ' + info.bathroom + ' with text: ' + info.text;
                break;
            case TALE_VOTE:
                today.taleVotes = (today.taleVotes + 1);
                message = 'A user just liked tale: ' + info.text;
                break;
            case STALL_RATING:
                message = 'A user just rated stall: ' + info.stall + ', and give it a rating of: ' + info.rating;
                today.ratings = (today.ratings + 1);
                break;
            case CODE_SCANNED:
                today.codesScanned = (today.codesScanned + 1);
                break;

        }
        await today.save();



        const mg = mailgun({ apiKey: MG_API_KEY, domain: MG_DOMAIN });
        const data = {
            from: 'World Pooper <me@samples.mailgun.org>',
            to: EMAILS,
            subject: 'World Poops Notification',
            text: message
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
};
