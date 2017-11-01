import resource from 'resource-router-middleware';

export default ({ config, db }) => resource({
	
	/** GET /:id - Return a given entity */
	index({ params }, res) {
		res.json(Math.floor(Math.random() * 100));
	}
});
