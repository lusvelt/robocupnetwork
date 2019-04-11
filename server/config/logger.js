const winston = require('winston');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

winston.configure({
    level: env === 'production' ? 'info' : 'debug',
    format: winston.format.combine(
        winston.format.label({
            label: path.basename(module.parent.filename)
        }),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        })
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
            )
        }),
        new winston.transports.Console({
            level: 'error',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.prettyPrint()
            ),
        })
    ]
});

module.exports = winston;