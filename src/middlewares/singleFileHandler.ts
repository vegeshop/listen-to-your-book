/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import multer from 'multer';
import moment from 'moment';
import path from 'path';

import ApiError from '../exceptions/ApiError';
import ErrorCode from '../exceptions/ErrorCode';
import logger from '../util/logger';

function jpg2jpeg(fileExt: string): string {
	return fileExt === '.jpg' ? '.jpeg' : fileExt;
}

export default multer({
	fileFilter(
		req: Express.Request,
		file: Express.Multer.File,
		callback: multer.FileFilterCallback
	) {
		if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
			return callback(
				new ApiError(
					400,
					ErrorCode.FILETYPE_NOT_SUPPORTED,
					'Only jpeg or png images allowed'
				)
			);
		}
		callback(null, true);
	},
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, 'images/');
		},
		filename: (req, file, cb) => {
			const ext = jpg2jpeg(path.extname(file.originalname));
			const filename = `${moment().valueOf()}${ext}`;
			logger.info('new profile picture uploaded: ' + filename);
			cb(null, filename);
		},
	}),
	limits: { fileSize: 5 * 1024 * 1024, fieldSize: 5 * 1024 * 1024 },
}).single('img');
