/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import request from 'supertest';
import App from './App';

/*
request.Test.prototype.authenticate = function (user) {
	const { token } = user.tokens;

	return this.set('Authorization', `Bearer ${token}`).set('X-XSRF-TOKEN');
};
*/

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
describe('GET /test - a simple api endpoint', () => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	it('Test API Request', async () => {
		const response = await request(App.bootstrap())
			.get('/test')
			.expect(200);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		expect(response.text).toEqual('well functioning');
	});
});
