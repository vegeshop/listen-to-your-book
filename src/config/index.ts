import dotenv from 'dotenv';
import logger from '../util/logger';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
} 

export default {
    env: process.env.NODE_ENV,

    port: process.env.PORT,

    ncloudApiHeader: {
        'X-NCP-APIGW-API-KEY-ID': <string> process.env.X_NCP_APIGW_API_KEY_ID,
        'X-NCP-APIGW-API-KEY': <string> process.env.X_NCP_APIGW_API_KEY,
    },

    naverApiHeader: {
        'X-Naver-Client-Id': <string> process.env.X_Naver_Client_Id,
        'X-Naver-Client-Secret': <string> process.env.X_Naver_Client_Secret,
    }
};