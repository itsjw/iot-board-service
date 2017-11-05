import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import auth from './auth';
import random from './random';
import home from './home';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));
	
	// mount the auth resource
	api.use('/auth', auth({ config, db }));

	api.use('/random', random({ config, db }));
        
	api.use('/home', home({ config, db }));
        
	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
