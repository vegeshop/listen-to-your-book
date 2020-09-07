import logger from '../util/logger';
import ApiError from '../exceptions/ApiError';
import ApiServerFaultError from '../exceptions/ApiServerFaultError';

export default class RequestContext {
	method: string;
	url: string;

	constructor(method: string, url: string) {
		this.method = method;
		this.url = url;
	}

	public log(err?: Error): void {
		if (err instanceof ApiError)
			logger.error(
				`errname: ${err.name}, status: 0x${
					err.statusCode
				}, errcode: ${err.errorCode.toString(16)}, message: ${
					err.message
				}, method: ${this.method}, url: ${this.url}`
			);
		else if (err instanceof ApiServerFaultError)
			logger.error(
				`errname: ${err.name}, status: 0x${err.statusCode}, message: ${err.message}, method: ${this.method}, url: ${this.url}`
			);
		else
			logger.error(
				`errname: ${err?.name}, message: ${err?.message}, method: ${this.method}, url: ${this.url}`
			);
	}
}
