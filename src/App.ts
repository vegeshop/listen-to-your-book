import express from 'express';
import path from 'path';
import contextMiddleware from './middlewares/contextHandler';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/errorHandler';
import nullPageHandler from './middlewares/nullPageHandler';

export default class App {
	public app: express.Application;

	/**
	 * @ class App
	 * @ method bootstrap
	 * @ static
	 */
	public static bootstrap(): App {
		return new App();
	}

	constructor() {
		this.app = express();
		this.settings();
		this.middlewares();
		this.routes();

		this.app.use(errorHandler);
	}

	private settings() {
		// view engine setup
		this.app.set('views', path.join(__dirname, 'views'));
		this.app.set('view engine', 'pug');
		this.app.use(contextMiddleware);
		this.app.use(express.static(path.join(__dirname, 'public')));
	}

	private middlewares() {
		this.app.use(express.json());
		this.app.use(
			bodyParser.urlencoded({
				extended: false,
				limit: '5mb',
				parameterLimit: 1000 * 1000,
			})
		);
		this.app.use(bodyParser.json({ limit: '5mb' }));
	}

	private routes() {
		this.app.get('/', (req: express.Request, res: express.Response) => {
			res.render('index', { title: '책, 듣다' });
		});
		// this.app.use('/api', require('./api').api);
		// catch 404 and forward to error handler
		this.app.use(nullPageHandler);
	}
}
