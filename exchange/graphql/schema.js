const exchangeService = require('../service/exchangeService');
var { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        exchanges: [Exchange]
        exchange(code: String!): Exchange
    }

    type Mutation {
        createExchange(code: String!, price: String!, date: String!, time: String!): Exchange
        updateExchange(code: String!): Exchange
        deleteExchange(code: String!): Exchange
    }

    type Exchange {
        code: String
        price: String
        date: String
        time: String
    }
`);

const resolver = {
    
    // 모든 환율
    exchanges: async (args, context, info) => {
        return await exchangeService.getAllRates();
    },
    
    // 환율 생성
    createExchange: async (args, context, info) => {
        return await exchangeService.createRate(args);
    },
    
    // 환율 갱신
    updateExchange: async (args, context, info) => {
        return await exchangeService.updateRate(args);
    },

    // 환율 삭제
    deleteExchange: async (args, context, info) => {
        return await exchangeService.deleteRate(args);
    },

    // 코드로 환율 반환
    exchange: async (args, context, info) => {
        return await exchangeService.getRate(args);
    }
};

module.exports = {schema: schema, root: resolver};