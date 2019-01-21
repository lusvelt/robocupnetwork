const { createLogger, format, transports } = require('winston');
const path = require('path');
// const fs = require('fs');

const env = process.env.NODE_ENV || 'development';
// const logDir = 'log';

// if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir);
// }

// const filename = path.join(logDir, 'results.log');

const logger = createLogger({
    level: env === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.label({
            label: path.basename(module.parent.filename)
        }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
            )
        }),
        new transports.Console({
            level: 'error',
            format: format.combine(
                format.colorize(),
                format.prettyPrint()
            ),
        }),
        // new transports.File({
        //     filename,
        //     format: format.printf(info => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
        // })
    ]
});

module.exports = logger;

/*logger.info('Hello world');
logger.debug('Debugging info');*/
//{ error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
