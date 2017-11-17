import resource from 'resource-router-middleware';

import HomeModel from './../models/home';
import UserModel from './../models/user';
import DashboardModel from './../models/dashboard';

export default ({ config, db }) => resource({
        id: 'request',

        load(req, userId, callback) {
            callback(null, {userId: userId, body: req.body});
        },

        read( { request }, res) {
            var model = new DashboardModel(db);

            model.getDashboard(request.userId).then((response) => {
                res.json(response);
            }).catch((err) => {
                res.json({isError: true, errorDescription: err.toString()});
            });
        },

        update( { request}, res) {
            var model = new DashboardModel(db);
            
            model.saveDashboard(request.userId, request.body).then((response) => {
                res.json(true);
            }).catch((err) => {
                res.json({isError: true, errorDescription: err.toString()});
            });
        },

    });