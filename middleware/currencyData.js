const memCache = require('memory-cache');
const axios = require("axios");

const access_key = require('../config/key.json').access_key;
const key = require('../config/key.json').key;

const cacheData = (duration) => {
    const URL = "http://data.fixer.io/api/latest?access_key=" + access_key;

    let cacheContent = memCache.get(key);
    if (cacheContent) {
        console.log("Data Already Cached");
    } else {
        axios.get(URL).then((response) => {
            let currencyData = response.data;
            memCache.put(key, currencyData, duration * 3600000);
            console.log("Data Cache Successful");
        })
    }
};

exports.cacheData = cacheData;
