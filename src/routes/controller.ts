/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import ApiError from '../exceptions/ApiError';
import ErrorCode from '../exceptions/ErrorCode';
import convertImageToText from '../util/nOCR';
import convertTextToVoice from '../util/nCSS';

export async function convertImgToVoice(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
	const file: Express.Multer.File = req.file;
	if (!file) {
		throw new ApiError(404, ErrorCode.FILE_NOT_FOUND, '파일을 찾을 수 없습니다');
	}
	const ocrFields = await convertImageToText(file);
	const text = parseFieldsToText(ocrFields);
	const voicePath = await convertTextToVoice(text);

	res.render('audio', { path: voicePath });
}

function parseFieldsToText(fields: any): string {
	const words: string[] = fields.map((obj: any) => obj.inferText);
	const text = words.join(' ');
	return text;
}
