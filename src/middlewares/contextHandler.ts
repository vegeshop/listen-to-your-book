import { NextFunction, Request, Response } from 'express';
import RequestContext from '../interfaces/RequestContext';
import declare from '../types'; // do not remove this line

export default (req: Request, res: Response, next: NextFunction) => {
	req['context'] = new RequestContext(req.method, req.url);
	next();
};
