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

function getRoomDetails(body) {
    var rooms = new Map();

    body.forEach((b) => {

        var room = rooms.get(b.room);

        if (room === undefined) {
            room = new RoomDetail(b.room);
            rooms.set(b.room, room);
        }

        let device = new DeviceDetail(b);

        room.appendDevice(device);
    });

    var roomSet = Array();

    rooms.forEach((value, key) => {
        roomSet.push(value);
    });

    return roomSet;
}

function findDevice(roomSet, deviceId) {
    let device = null;
    
    for(let i = 0; i < roomSet.length; i++) {
        let device = roomSet[i].getDevice(deviceId);
        
        if(device !== null)
            return device;
    }
    
    return null;
}

export default function (config) {
    this.queuryRooms = function (userId) {
        return new Promise((resolve, reject) => {
            axios.get(config.apiEndpoint + '/things/' + userId).then(function (response) {
                resolve(getRoomDetails(response.data.body));
            }).catch((err) => {
                throw err;
                reject();
            });
        });
    };
    
    this.queryDevice = function(userId, deviceId) {
        return new Promise((resolve, reject) => {
            axios.get(config.apiEndpoint + '/things/' + userId).then(function (response) {
                let roomDetails = getRoomDetails(response.data.body);
                let device = findDevice(roomDetails, deviceId);
                resolve(device);
            }).catch((err) => {
                reject(err);
            });
        });        
    };
}