import ApiError from './ApiError';
import ErrorCode from './ErrorCode';

export default class ApiServerFaultError extends ApiError {
	constructor(
		message = '서버에 알 수 없는 문제가 발생했습니다. 유감이군요 개발자님.'
	) {
		super(500, ErrorCode.SERVER_FAULT, message);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ApiServerFaultError);
		}
	}
}
