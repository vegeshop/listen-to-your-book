import RequestContext from '../../interfaces/RequestContext';
declare global {
	namespace Express {
		interface Request {
			context: RequestContext;
		}
	}
}
