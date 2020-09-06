import ErrorCode from './ErrorCode';

export default class ApiError extends Error {
    constructor(public statusCode: number, public errorCode: ErrorCode, public message: string) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}