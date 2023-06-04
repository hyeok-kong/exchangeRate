module.exports = (function() {
    const mongoose = require('mongoose');
    const URI = "127.0.0.1:27017";
    const DB = "exchange";

    const db = mongoose.connection;
    db.on('error', console.error);
    db.once('open', function() {
        console.log("Connected to mongod server");
    });

    mongoose.connect(`mongodb://${URI}/${DB}`, { useNewUrlParser: true });

    const schema = {};
    const model = {};

    schema.Exchange = require('./schema/exchange')(mongoose);
    
    // 스키마 추가 시 모델에서 한번에 관리 가능
    for(let k in schema) {
        model[k] = mongoose.model(k, schema[k]);
    }

    return model;
})();