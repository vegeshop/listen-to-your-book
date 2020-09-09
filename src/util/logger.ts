/* eslint-disable @typescript-eslint/restrict-template-expressions */
import winston = require('winston');
import winstonDaily = require('winston-daily-rotate-file');
import config from '../config';
import fs from 'fs';
import path from 'path';
import moment from 'moment-timezone';

const logDir = path.join(__dirname, '..', '..', 'logs');
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const timezoned = () => moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss').trim();

const logFormat = winston.format.printf((info) => `[${info.timestamp}] [${info.level}] ${typeof info.message === 'string' ? info.message : JSON.stringify(info.message)}`);

const infoLogger = new winstonDaily({
	level: 'info',
	dirname: logDir,
	filename: `%DATE%.log`,
	datePattern: 'YYYY-MM-DD',
	zippedArchive: true,
	maxSize: '2m',
	maxFiles: 14,
});

const exceptionLogger = new winstonDaily({
	level: 'error',
	dirname: logDir + '/error',
	filename: `%DATE%.error.log`,
	datePattern: 'YYYY-MM-DD',
	maxSize: '1m',
	maxFiles: 5,
});

const debugLogger = new winstonDaily({
	level: 'debug',
	dirname: logDir + '/debug',
	filename: `%DATE%.debug.log`,
	datePattern: 'YYYY-MM-DD',
	maxSize: '5m',
	maxFiles: 5,
});

const logger = winston.createLogger({
	level: 'debug',
	format: winston.format.combine(
		winston.format.timestamp({
			format: timezoned,
		}),
		logFormat
	),
	transports: [exceptionLogger, infoLogger, debugLogger],
});

winston.loggers.add('default', {
	level: config.env === 'development' ? 'debug' : 'info',
	transports: [exceptionLogger, infoLogger, debugLogger],
	format: winston.format.combine(
		winston.format.timestamp({
			format: timezoned,
		}),
		winston.format.printf((info) => `[${info.timestamp}] [${info.level}] ${typeof info.message === 'string' ? info.message : JSON.stringify(info.message)}`)
	),
});

if (config.env !== 'production') {
	logger.add(
		new winston.transports.Console({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp({
					format: timezoned,
				}),
				winston.format.colorize(),
				winston.format.simple()
			),
		})
	);
}

export default logger;
