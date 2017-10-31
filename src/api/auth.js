import resource from 'resource-router-middleware';

export default ({ config, db }) => resource({
	/** POST / - Create a new entity */
	create({ body }, res) {
		
		if(body.username == "testUser" && body.password == "password")
			res.json({isAuth: true});
		else
			res.json({isAuth: false});
	}
});
