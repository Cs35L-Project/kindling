const dbConfig = require('../config/db.config.js');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.users = require("./user.model.js")(sequelize, Sequelize);
db.refreshTokens = require("../models/refreshToken.model.js")(sequelize, Sequelize);

db.users.hasOne(db.refreshTokens, {
    foreignKey: 'userId', targetKey: 'id'
});

db.refreshTokens.belongsTo(db.users, {
    foreignKey: 'userId', targetKey: 'id'
});

module.exports = db;
