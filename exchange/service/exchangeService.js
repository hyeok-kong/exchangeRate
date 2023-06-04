const axios = require('axios');

module.exports = (function() {
    const model = require('../mongoose/model');

    async function createRate({code, price, date, time}) {
        const newRate = new model.Exchange({code: code, price: price, date: date, time: time});

        console.log(code, price, date, time);
        
        const result = await newRate.save();

        return result;
    }


    async function getRate(code) {
        return await model.Exchange.findOne(code);
    }


    async function getAllRates() {
        return await model.Exchange.find({});
    }


    async function updateRate(code) {
        axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            const obj = res.data[0];

            const newPrice = obj.cashBuyingPrice;
            const newDate = obj.date;
            const newTime = obj.time;

            console.log(code, newPrice, newDate, newTime);
            
            const filter = { code: code };
            const update = { price: newPrice, date: newDate, time: newTime };

            // update 실패
            model.Exchange.findOneAndUpdate(filter, {$set: update});

            // deleteRate(code);
            // createRate({code: code.code, price: newPrice, date: newDate, time: newTime});
        }).catch((err) => {
            // console.log(err);
        })
    }


    async function deleteRate(code) {
        await model.Exchange.deleteOne(code);

        return code;
    }


    return {
        createRate: createRate,
        getRate: getRate,
        getAllRates: getAllRates,
        updateRate: updateRate,
        deleteRate: deleteRate,
    };
})();