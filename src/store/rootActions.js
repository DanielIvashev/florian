import { i18n, SUPPORT_LOCALES, loadLocaleMessages } from '@/i18n';
import { createNotification } from '@/utils';
import RepositoryFactory from "@/repositories/repositoryFactory";

const coinGeckoRepository = RepositoryFactory.get('gecko');

export const rootActions = {
  initialize({ commit, dispatch }) {
    const setLocale = dispatch('setLocale', { locale: 'en' });
    const loadCoinsMarket = dispatch('loadCoinsMarket');

    return Promise.allSettled([setLocale, loadCoinsMarket]);
  },
  async setLocale({ commit, dispatch }, { locale }) {
    if (SUPPORT_LOCALES.includes(locale)) {
      try {
        commit('SET_LOCALE_LOADING');
        await loadLocaleMessages(i18n, locale || 'en');
        commit('SET_LOCALE_SUCCESS', { locale });
      } catch (error) {
        commit('SET_LOCALE_ERROR', { error });
        createNotification({
          type: 'error',
          group: true,
          message: 'Locales loading failed',
        });
      }
    }
  },
  loadCoinsMarket({ commit, dispatch }) {
    commit('SET_COINS_GECKO_LOADING');
    return coinGeckoRepository
      .getCoinsMarkets()
      .then(({ data, status }) => {
        if (status !== 200 || !data || !data.length) {
          throw new Error();
        }
        commit('SET_COINS_GECKO_SUCCESS', { coins: data });
        return data;
      })
      .catch(error => {
        commit('SET_COINS_GECKO_ERROR', { error });
        createNotification({
          type: 'error',
          group: true,
          message: 'Coins gecko loading failed',
        });
      })
  },
  async loadCoinById({ commit, dispatch }, payload = {}) {
    commit('SET_COIN_GECKO_LOADING');
    return coinGeckoRepository
      .getCoinById({ id: payload.id })
      .then(({ data, status }) => {
        if (status !== 200 || !data) {
          throw new Error();
        }
        commit('SET_COIN_GECKO_SUCCESS', { coin: data });
        return data;
      })
      .catch(error => {
        commit('SET_COIN_GECKO_ERROR', { error });
        createNotification({
          type: 'error',
          group: true,
          message: 'Coin gecko loading failed',
        });
      })
  }
};
