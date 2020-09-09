/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ncloud Clova Speech Synthesis API - Text to Speech
import moment from 'moment';
import path from 'path';
import fs from 'fs';
import logger from '../util/logger';
import config from '../config';
import { Stream } from 'winston-daily-rotate-file';

const request = require('request-promise-native');

const api_url = 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts';

export default async function (inputText: string): Promise<string> {
	const options = {
		url: api_url,
		form: { speaker: 'mijin', speed: '-3', text: inputText },
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			...config.ncloudApiHeader,
		},
	};
	const filename = `${moment().valueOf()}.mp3`;
	const filepath = path.join(__dirname, '..', 'public', 'audios', filename);

	ensureDirectoryExistence(filepath);
	const writeStream = fs.createWriteStream(filepath);

	await request.post(options).pipe(writeStream);

	logger.info(`CSS succeded: ${filepath}`);
	return await streamPromise(writeStream, path.join('audios', filename));
}

function ensureDirectoryExistence(filepath: string): void {
	const dirname = path.dirname(filepath);
	if (!fs.existsSync(dirname)) fs.mkdirSync(dirname, { recursive: true });
}

function streamPromise(stream: Stream, returnValue: string): Promise<string> {
	return new Promise((resolve, reject) => {
		stream.on('end', () => {
			resolve('end');
		});
		stream.on('finish', () => {
			logger.info(`file written: ${returnValue}`);
			resolve(returnValue);
		});
		stream.on('error', (error) => {
			reject(error);
		});
	});
}
