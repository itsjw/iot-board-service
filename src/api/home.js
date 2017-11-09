import resource from 'resource-router-middleware';

import HomeModel from './../models/home';
import UserModel from './../models/user';

export default ({ config, db }) => resource({
        id: 'user',

        load(req, id, callback) {
            console.log(id);
            callback(null, id);
        },

        read( { user }, res) {
            new HomeModel(config).queuryRooms(user).then((response) => {
                res.json(response);
            }).catch((err) => {
                res.json({isError: true, errorDescription: err.toString()});
            });
        },

        index( { params }, res) {
            new UserModel(config).getUsers().then((result) => {
                res.json(result);
            }).catch((err) => {
                throw err;
            });
        }
    });