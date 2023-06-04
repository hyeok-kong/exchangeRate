const axios = require('axios');

module.exports = (function() {
    const model = require('../mongoose/model');

    // 환율 생성
    async function createRate({code, price, date, time}) {
        // 코드, 가격, 날짜, 시간으 입력받아 DB에 저장
        // 업데이트 시 사용하는 API의 반환값을 기준으로 생성했음
        const newRate = new model.Exchange({code: code, price: price, date: date, time: time});

        console.log(code, price, date, time);
        
        const result = await newRate.save();

        return result;
    }

    // 코드로 환율 반환
    // USD 넣을 시 원 => 달러 환율 반환
    async function getRate(code) {
        return await model.Exchange.findOne(code);
    }

    // 모든 환율 반환
    // 원(KRW)를 기준으로 반환하기로 기획
    async function getAllRates() {
        return await model.Exchange.find({});
    }


    async function updateRate(code) {
        // 해당하는 코드의 데이터를 요청, 업데이트 실시
        // 아래 링크는 KRW/USD만 반환하지만, API KEY를 사용하는 주소로 변경 시 여러 환율에 대해 수정 가능
        axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD')
        .then((res) => {
            const obj = res.data[0];

            // 데이터 호출 확인
            const newPrice = obj.cashBuyingPrice;
            const newDate = obj.date;
            const newTime = obj.time;
            console.log(code, newPrice, newDate, newTime);
            
            const filter = { code: code };
            const update = { price: newPrice, date: newDate, time: newTime };

            // update 실패
            // 삽입, 삭제, 조회는 가능하지만 수정 기능은 안됩니다.
            model.Exchange.findOneAndUpdate(filter, {$set: update});
        }).catch((err) => {
            console.log(err);
        })
    }

    // 해당 코드의 환율 삭제
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