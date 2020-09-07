import { NextFunction, Request, Response } from 'express';
import RequestContext from '../interfaces/RequestContext';

export default (req: Request, res: Response, next: NextFunction): void => {
	req['context'] = new RequestContext(req.method, req.url);
	next();
};
