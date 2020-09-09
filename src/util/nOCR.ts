/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// naver OCR API - Image to Text
import moment from 'moment';
import logger from '../util/logger';
import config from '../config';

const request = require('request-promise-native');

export default async function (file: Express.Multer.File): Promise<any> {
	const options = {
		url: config.OCR_URL,
		body: {
			images: [
				{
					format: file.mimetype.split('/')[1],
					name: 'book',
					data: file.buffer.toString('base64'),
				},
			],
			lang: 'ko',
			requestId: 'string',
			resultType: 'string',
			timestamp: moment().valueOf(),
			version: 'V2',
		},
		headers: {
			'Content-Type': 'application/json',
			'X-OCR-SECRET': config.X_OCR_SECRET,
		},
		json: true,
	};
	const parsedBody = await request.post(options);

	logger.info(`OCR succeded: ${file.originalname}`);

	return parsedBody.images[0].fields;
}
