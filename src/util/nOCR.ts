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

const api_url =
	'https://056a21188f8a4f9e99f32e7df69bf449.apigw.ntruss.com/custom/v1/3807/679fe5feba6c42fd61a54b3fc64f6bde4fb26022322ac0d3aa09cad410210c8d/general';

export default async function (file: Express.Multer.File): Promise<any> {
	const options = {
		url: api_url,
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
