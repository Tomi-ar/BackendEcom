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
    // rejectionHandlers: [
    //     new winston.transports.File({ filename: path.join(__dirname, 'error.log'), level: 'error'})
    // ],
    // exceptionHandlers: [
    //     new winston.transports.File({ filename: path.join(__dirname, 'exception.log'), level: "warn" }),
    // ]
})

module.exports = logger;