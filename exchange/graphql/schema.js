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
    exchanges: async (args, context, info) => {
        return await exchangeService.getAllRates();
    },
    createExchange: async (args, context, info) => {
        return await exchangeService.createRate(args);
    },
    updateExchange: async (args, context, info) => {
        return await exchangeService.updateRate(args);
    },
    deleteExchange: async (args, context, info) => {
        return await exchangeService.deleteRate(args);
    },
    exchange: async (args, context, info) => {
        return await exchangeService.getRate(args);
    }
};

module.exports = {schema: schema, root: resolver};