import express from 'express';
import ApiError from '../exceptions/ApiError';
import ErrorCode from '../exceptions/ErrorCode';

export default (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	next(new ApiError(404, ErrorCode.API_NOT_FOUND, 'Page Not Found'));
};
