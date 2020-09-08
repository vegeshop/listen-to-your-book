import express from 'express';
import ApiError from '../exceptions/ApiError';
import ErrorCode from '../exceptions/ErrorCode';
import convertImageToText from '../util/nCSS';
import convertTextToVoice from '../util/nCSS';

export async function convertImgToVoice(
	req: express.Request,
	res: express.Response
): Promise<void> {
	const file: Express.Multer.File = req.file;
	if (!file) {
		throw new ApiError(
			404,
			ErrorCode.FILE_NOT_FOUND,
			'파일을 찾을 수 없습니다'
		);
	}

	const text: string = await convertImageToText(file);
	const voice = await convertTextToVoice(text, file.filename);

	res.status(201).send(voice);
}
