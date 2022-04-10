const path = require("path");
const winston = require('winston');

const logger = winston.createLogger({ 
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: path.join(__dirname, 'warn.log'), level: 'warn' }),
        new winston.transports.File({ filename: path.join(__dirname, 'error.log'), level: 'error'})
    ],
})

module.exports = logger;