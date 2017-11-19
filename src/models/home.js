var Promise = require('promise');

var axios = require("axios");

function SensorDetail(field, dataType, lastReading) {
    this.field = field;
    this.dataType = dataType;
    this.lastReading = lastReading;
}

function DeviceDetail(body) {
    this.id = body.deviceId;
    this.ecosys = body.ecosys;
    this.name = body.name;

    this.typesSensor = body.typesSensor;

    this.sensors = Array();

    body.sensors.forEach((e) => {
        let field = e.field;
        let type = e.type;
        let lastReading = body.lastReading[field];
        this.sensors.push(new SensorDetail(field, type, lastReading));
    });
    
    this.getSensorValue = (field) => {
        for(let i = 0; i < this.sensors.length; i++) {
            if(this.sensors[i].field === field) {
                return this.sensors[i].lastReading;
            }
        }
        
        return undefined;
    };
    
    this.getSensorValues = () => {
        let sensorValues = {};
        
        this.sensors.forEach((s) => {
            sensorValues[s.field] = s.lastReading;
        });
        
        return sensorValues;
    };
}

function RoomDetail(name) {
    this.name = name;
    this.devices = Array();

    this.appendDevice = (device) => {
        this.devices.push(device);
    };
    
    this.getDevice = (deviceId) => {
        let dev = this.devices.find((d) => {
            return (d.id === deviceId);
        });
        
        return dev;
    };
}

function getDeviceDetails(body) {
    var devices = new Array();

    body.forEach((b) => {
        let device = new DeviceDetail(b);

        devices.push(device);
    });

    return devices;
}

function findDevice(deviceSet, deviceId) {
    
    for(let i = 0; i < deviceSet.length; i++) {
        if(deviceId === deviceSet[i].id)
            return deviceSet[i];
    }
    
    return null;
}

export default function (config) {
    this.queuryDevices = function (userId) {
        return new Promise((resolve, reject) => {
            axios.get(config.apiEndpoint + '/things/' + userId).then(function (response) {
                resolve(getDeviceDetails(response.data.body));
            }).catch((err) => {
                throw err;
                reject();
            });
        });
    };
    
    this.queryDevice = function(userId, deviceId) {
        return new Promise((resolve, reject) => {
            axios.get(config.apiEndpoint + '/things/' + userId).then(function (response) {
                let roomDetails = getDeviceDetails(response.data.body);
                let device = findDevice(roomDetails, deviceId);
                resolve(device);
            }).catch((err) => {
                reject(err);
            });
        });
    };
}