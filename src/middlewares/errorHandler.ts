import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/ApiError';
import RequestContext from '../interfaces/RequestContext';

export default function (err: Error, req: Request, res: Response, next: NextFunction): void {
	const context = req.context;
	if (context instanceof RequestContext) {
		context.log(err);
	}

	const statusCode = err instanceof ApiError ? err.statusCode : 500;
	// set locals, only providing error in development
	res.locals.message = `${statusCode} : err.message`;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(statusCode).render('error');

	// if (err instanceof ApiError) {
	// 	res.status(err.statusCode).json({
	// 		errcode: err.errorCode,
	// 		message: err.message,
	// 	});
	// 	return;
	// }

	// const serverFaultError = new ApiServerFaultError();
	// res.status(serverFaultError.statusCode).json({
	// 	errcode: serverFaultError.errorCode,
	// 	message: serverFaultError.message,
	// 	source: err,
	// });
}
