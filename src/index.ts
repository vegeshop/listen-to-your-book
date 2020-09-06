import App from './App';
import express from 'express';
import logger from './util/logger';

const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
const app: express.Application = App.bootstrap().app;
const index = http.createServer(app);

index.listen(port);
index.on('listening', onListening);

/**
 * Event listeners below.
 */

function normalizePort(portStr: string) {
	const port = parseInt(portStr, 10);
	return isNaN(port) ? portStr : port >= 0 ? port : false;
}

function onListening() {
	const addr = index.address();
	const bind =
		typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	logger.info('API Server Listening on ' + bind);
}
