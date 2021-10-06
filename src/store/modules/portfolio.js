const state = {
    funds: 10000,
    stocks: []
};

const mutations = {
    'BUY_STOCK'(state, {stockId, quantity, stockPrice}) {
        // check to find a specific stocks from existing stocks
        const record = state.stocks.find(element => element.id == stockId);
        // if the order is exist in our existing stocks
        if (record) {
            record.quantity += quantity;
        } else {
            // if not exist create a new one in stocks array
            state.stocks.push({
                id: stockId,
                quantity: quantity
            });
        }
        // after buying new stock the funds decreases
        state.funds -= stockPrice * quantity;
    },
    'SELL_STOCK' (state, {stockId, quantity, stockPrice}) {
        const record = state.stocks.find(element => element.id == stockId);
        // if selling quantity is less than existing quantity only decreases the number of buying quantity from existing quantity 
        if (record.quantity > quantity) {
            record.quantity -= quantity;
        } else {
            // if the the selling quantity is more than existing quantity the stock will be finished and removed from the stock array
            state.stocks.splice(state.stocks.indexOf(record), 1);
        }
        // at last the existing funds increases
        state.funds += stockPrice * quantity;
    },
    'SET_PORTFOLIO' (state, portfolio) {
        state.funds = portfolio.funds;
        state.stocks = portfolio.stockPortfolio ? portfolio.stockPortfolio : [];
    }
};

const actions = {
    sellStock({commit}, order) {
        commit('SELL_STOCK', order);
    }
};

const getters = {
    stockPortfolio (state, getters) {
        return state.stocks.map(stock => {
            const record = getters.stocks.find(element => element.id == stock.id);
            return {
                id: stock.id,
                quantity: stock.quantity,
                name: record.name,
                price: record.price
            }
        });
    },
    funds (state) {
      return state.funds;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}