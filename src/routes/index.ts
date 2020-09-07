import express from 'express';

export const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {
	res.render('index', { title: '책, 듣다' });
});

router.get('/test', (req: express.Request, res: express.Response) => {
	res.send('well functioning');
});
