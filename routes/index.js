const express = require('express');
const router = express.Router();
const memCache = require('memory-cache');

const key = require('../config/key.json').key;

router.post('/convert', function (req, res, next) {

    let {fromCurrency, toCurrency, amount} = req.body;
    try {
        let rates = fetchCurrencyData();

        let fromCurrencyEURPrice = rates[fromCurrency];
        let toCurrencyEURPrice = rates[toCurrency];

        if (!fromCurrencyEURPrice === undefined || fromCurrencyEURPrice > 0) {

            let finalCurrencyPrice = (amount / fromCurrencyEURPrice) * toCurrencyEURPrice;
            let responseObj = {"amount": finalCurrencyPrice, "currency": toCurrency};

            handleResponse(res, 200, "Success", responseObj);
        } else {
            handleResponse(res, 400, +`${fromCurrency} Doesn't have a Exchange Rate`);
        }
    } catch (e) {
        handleResponse(res, 400, "Unexpected Error Occurred");
    }

});

// Fetch Exchange Rates from Cache
let fetchCurrencyData = () => {
    let responseObj = memCache.get(key);
    return responseObj.rates;
};

// Handle Response
let handleResponse = (res, status_code, message, body) => {
    if (+status_code === 200) {
        return res.status(200).send({message: message, data: body});
    } else {
        return res.status(400).send({message: message});
    }
};

module.exports = router;
