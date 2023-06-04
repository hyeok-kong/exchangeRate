module.exports = function(mongoose) {
    return new mongoose.Schema({
        code: String, // currencyCode
        price: String, // cashBuyingPrice
        date: String, // date
        time: String // time
    });
};
