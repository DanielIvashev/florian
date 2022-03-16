import {markRaw} from 'vue';

export const rootMutations = {
    TOGGLE_THEME(state) {
        state.isLightTheme = !state.isLightTheme;
    },
    SET_LOCALE_SUCCESS(state, {locale}) {
        state.localeLoading = false;
        state.localeError = null;
        state.locale = locale;
    },
    SET_LOCALE_LOADING(state) {
        state.localeLoading = true;
        state.localeError = null;
    },
    SET_LOCALE_ERROR(state, {error}) {
        state.localeLoading = false;
        state.localeError = error;
    },
    SET_COINS_GECKO_LOADING(state) {
        state.coinsGeckoLoading = true;
        state.coinsGeckoError = null;
    },
    SET_COINS_GECKO_SUCCESS(state, { coins }) {
        state.coinsGeckoLoading = false;
        state.coinsGeckoError = null;
        state.coinsGecko = markRaw(coins);
    },
    SET_COINS_GECKO_ERROR(state, {error}) {
        state.coinsGeckoLoading = false;
        state.coinsGeckoError = error;
    },
    SET_COIN_GECKO_LOADING(state) {
        state.coinGeckoLoading = true;
        state.coinGeckoError = null;
    },
    SET_COIN_GECKO_SUCCESS(state, {coin}) {
        state.coinGeckoLoading = false;
        state.coinGeckoError = null;
        state.coinGecko = markRaw(coin);
    },
    SET_COIN_GECKO_ERROR(state, {error}) {
        state.coinGeckoLoading = false;
        state.coinGeckoError = error;
    },
    SET_MEMBER_FROM_MEMBERSTACK(state, { member }) {
        state.memberFromMemberStack = markRaw(member);
    },
    SET_LIKED_COINS_IDS(state, { coins }) {
        state.likedCoinsIds = markRaw(coins);
    },
    SET_LIKED_COINS(state, { coins }) {
        state.likedCoins = markRaw(coins);
    }
};
