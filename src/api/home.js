import resource from 'resource-router-middleware';

import nestModel from './../models/nest';

export default ({ config, db }) => resource({
	id : 'device',
        
	load(req, id, callback) {
		callback(null, id);
	},
	/** GET /:id - Return a given entity */
	read({ device }, res) {
		res.json(nestModel.queryLatest(device));
	}
    });