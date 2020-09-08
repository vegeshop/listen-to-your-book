import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (process.env.NODE_ENV === 'development' && envFound.error) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
	env: process.env.NODE_ENV,

	port: process.env.PORT,

	ncloudApiHeader: {
		'X-NCP-APIGW-API-KEY-ID': <string>process.env.X_NCP_APIGW_API_KEY_ID,
		'X-NCP-APIGW-API-KEY': <string>process.env.X_NCP_APIGW_API_KEY,
	},

	X_OCR_SECRET: <string>process.env.X_OCR_SECRET,
};
