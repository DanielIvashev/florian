export const rootGetters = {
    getIsLightTheme(state) {
        return state.isLightTheme;
    },
    getLocale(state) {
        return state.locale;
    },
    isLocaleChanging(state) {
        return state.localeLoading;
    },
    getCoinsGecko(state) {
        return state.coinsGecko || [];
    },
    getCoinGecko(state) {
        return state.coinGecko || {};
    },
    getCoinsGeckoLoading(state) {
        return state.coinsGeckoLoading;
    },
    getCoinsGeckoError(state) {
        return state.coinsGeckoError;
    },
    getCoinGeckoError(state) {
        return state.coinGeckoError;
    },
    getCoinGeckoLoading(state) {
        return state.coinGeckoLoading;
    },
    getMemberFromMemberstack(state) {
        return state.memberFromMemberStack || {};
    }
};
