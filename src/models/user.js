var Promise = require('promise');

var axios = require("axios");

export default function (config) {
    this.getUsers = function () {
        return new Promise((resolve, reject) => {
            axios.get(config.apiEndpoint + '/users/all').then(function (response) {
                let details = Array();
                response.data.body.forEach((e) => {
                    details.push(e.id);
                });
                
                resolve(details);
            }).catch(()=>{
                reject();
            });
        });
    };
}