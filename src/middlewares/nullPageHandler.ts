import express from 'express';
import ApiError from '../exceptions/ApiError';
import ErrorCode from '../exceptions/ErrorCode';

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.status(400);
	next(new ApiError(404, ErrorCode.PAGE_NOT_FOUND, 'Page Not Found'));
};
