export default {
  setLastPays(state, data) {
    state.listLatestPay = data;
  },
  isLoadLastPays(state, data) {
    state.loadLatestPay = data;
  },
  setTopCategories(state, data) {
    state.listTopCategories = data;
  },
  isLoadTopCategories(state, data) {
    state.loadTopCategories = data;
  },
  setTopExpensivePay(state, data) {
    state.listTopExpensivePay = data;
  },
  isLoadTopExpensivePay(state, data) {
    state.loadTopExpensivePay = data;
  },
};
