var MongoClient = require('mongodb').MongoClient;

export default (config, callback) => {
    MongoClient.connect(config.database, (err, db) => {
        if (err)
            throw err;

        callback(db);
    });
}
