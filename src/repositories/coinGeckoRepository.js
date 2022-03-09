import Repository from './repository';

const geckoApiBaseUrl = 'https://api.coingecko.com/api/v3/';

export default {
  getCoinsMarkets (params = {}) {
    if (!params.vs_currency) {
      params = { ...params, vs_currency: 'BTC' }
    }
    return Repository.get(`${geckoApiBaseUrl}/coins/markets`, { params });
  },
  getCoinById (params = {}) {
    return Repository.get(`${geckoApiBaseUrl}/coins`, { params })
  }
};
