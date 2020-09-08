import express from 'express';
import { safe } from 'express-safe-async';
import singleFileHandler from '../middlewares/singleFileHandler';
import { convertImgToVoice } from './controller';

export const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	res.render('index', { title: '책, 듣다' });
});

router.get('/test', (req: express.Request, res: express.Response) => {
	res.send('well functioning');
});

router.post('/convert', singleFileHandler, safe(convertImgToVoice));
