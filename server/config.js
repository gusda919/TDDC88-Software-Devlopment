var config = {};

config.port = process.env.WEB_PORT || 8080;

config.mongo = {
    "uri": "mongodb://database/mean-app",
}

module.exports = config;

