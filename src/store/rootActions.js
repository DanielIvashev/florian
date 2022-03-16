import {i18n, SUPPORT_LOCALES, loadLocaleMessages} from '@/i18n';
import {createNotification} from '@/utils';
import RepositoryFactory from "@/repositories/repositoryFactory";

const coinGeckoRepository = RepositoryFactory.get('gecko');

export const rootActions = {
    initialize({commit, dispatch}) {
        const setLocale = dispatch('setLocale', {locale: 'en'});
        const setMember = dispatch('initializeMemberStack')
        return Promise.allSettled([setLocale, setMember]);
    },
    async setLocale({commit, dispatch}, {locale}) {
        if (SUPPORT_LOCALES.includes(locale)) {
            try {
                commit('SET_LOCALE_LOADING');
                await loadLocaleMessages(i18n, locale || 'en');
                commit('SET_LOCALE_SUCCESS', {locale});
            } catch (error) {
                commit('SET_LOCALE_ERROR', {error});
                createNotification({
                    type: 'error',
                    group: true,
                    message: 'Locales loading failed',
                });
            }
        }
    },
    loadCoinsMarket({commit, dispatch}, payload = {}) {
        commit('SET_COINS_GECKO_LOADING');
        return coinGeckoRepository
            .getCoinsMarkets({params: payload.params})
            .then(({data, status}) => {
                if (status !== 200 || !data || !data.length) {
                    throw new Error();
                }
                commit('SET_COINS_GECKO_SUCCESS', {coins: data});
                return data;
            })
            .catch(error => {
                commit('SET_COINS_GECKO_ERROR', {error});
                createNotification({
                    type: 'error',
                    group: true,
                    message: 'Coins gecko loading failed',
                });
            })
    },
    async loadCoinById({commit, dispatch}, payload = {}) {
        commit('SET_COIN_GECKO_LOADING');
        return coinGeckoRepository
            .getCoinById({id: payload.id, params: payload.params})
            .then(({data, status}) => {
                if (status !== 200 || !data) {
                    throw new Error();
                }
                commit('SET_COIN_GECKO_SUCCESS', { coin: data });
                return data;
            })
            .catch(error => {
                commit('SET_COIN_GECKO_ERROR', {error});
                createNotification({
                    type: 'error',
                    group: true,
                    message: 'Coin gecko loading failed',
                });
            })
    },
    initializeMemberStack({ commit, dispatch }) {
        if (window.MemberStack) {
            window.MemberStack.reload();
            window.MemberStack.onReady.then((member) => {
                commit('SET_MEMBER_FROM_MEMBERSTACK', { member });
                commit('bullbearSignal/INIT_FIELDS_VALUES', { member })
            })
        }
    },
    updateProfileInfo({ commit }, { fields }) {
        if (!window.MemberStack || !fields || !fields.length) return;
        MemberStack.onReady.then(function(member) {
            member.updateProfile({
                ...fields.reduce((acc, field) => {
                    acc[field.name] = field.value;
                    return acc;
                }, {})
            }, false)
        })
    }
};
