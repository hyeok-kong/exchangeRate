module.exports = function(mongoose) {
    // 데이터베이스 스키마
    return new mongoose.Schema({
        code: String, // currencyCode
        price: String, // cashBuyingPrice
        date: String, // date
        time: String // time
    });
};
