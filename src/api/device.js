import resource from 'resource-router-middleware';

import HomeModel from './../models/home';
import UserModel from './../models/user';

export default ({ config, db }) => resource({
        id: 'device',

        load(req, id, callback) {
            let deviceParam = {userId: req.query.userId, deviceId: id, sensor: req.query.sensor};
            callback(null, deviceParam);
        },

        read( { device }, res) {
            new HomeModel(config).queryDevice(device.userId, device.deviceId).then((response) => {
                
                let result = device.sensor === undefined ? response.getSensorValues() : response.getSensorValue(device.sensor);
                res.json(result);
            }).catch((err) => {
                res.json({isError: true, errorDescription: err.toString()});
            });
        }
    });