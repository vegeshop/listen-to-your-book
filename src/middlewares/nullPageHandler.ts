import express from 'express';
import ApiError from '../exceptions/ApiError';
import ErrorCode from '../exceptions/ErrorCode';

export default (req: express.Request, res: express.Response, next: express.NextFunction): void => {
	res.status(404);
	next(new ApiError(404, ErrorCode.PAGE_NOT_FOUND, 'Page Not Found'));
};
