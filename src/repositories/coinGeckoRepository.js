import Repository from './repository';

const geckoApiBaseUrl = 'https://api.coingecko.com/api/v3/';

export default {
  getCoinsMarkets (params = {}) {
    if (!params || !params.vs_currency) {
      params = { ...(params || {}), vs_currency: 'USD' }
    }
    return Repository.get(`${geckoApiBaseUrl}/coins/markets`, { params });
  },
  getCoinsBySearch (params = {}) {
    return Repository.get(`${geckoApiBaseUrl}/search`, { params });
  },
  getCoinById (params = {}) {
    return Repository.get(`${geckoApiBaseUrl}/coins`, { params })
  }
};
