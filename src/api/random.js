import resource from 'resource-router-middleware';

export default ({ config, db }) => resource({
	
	/** GET /:id - Return a given entity */
	index({ params }, res) {
        
            setTimeout(() => {
                let value = Math.floor(Math.random() * 100);
                let x = Math.floor(new Date().getTime() / 1000) - 1509515855;

                res.json({x: x, value: 10});
            }, 300);
                     
	}
});
