/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// ncloud Clova Speech Synthesis API - Text to Speech
import express from 'express';
import path from 'path';
import fs from 'fs';
import config from '../config';

const request = require('request-promise-native');

const api_url = 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts';

// eslint-disable-next-line @typescript-eslint/require-await
export default async function (
	inputText: string,
	filebase: string
): Promise<string> {
	const options = {
		url: api_url,
		form: { speaker: 'mijin', speed: '0', text: inputText },
		headers: config.ncloudApiHeader,
	};
	const filepath = path.join(
		__dirname,
		'..',
		'assets',
		'images',
		`${filebase}.mp3`
	);
	const writeStream = fs.createWriteStream(filepath);

	const _req = request.post(options).on('response', (response: any) => {
		console.log(response.statusCode); // 200
		console.log(response.headers['content-type']);
	});

	_req.pipe(writeStream); // file로 출력
	// _req.pipe(res); // 브라우저로 출력

	writeStream.close();
	return filepath;
}
