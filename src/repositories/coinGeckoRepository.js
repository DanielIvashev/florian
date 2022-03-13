import Repository from './repository';

const geckoApiBaseUrl = 'https://api.coingecko.com/api/v3';

export default {
  getCoinsMarkets (payload = {}) {
    if (!payload.params || !payload.params.vs_currency) {
      payload.params = { ...(payload.params || {}), vs_currency: 'USD' }
    }
    return Repository.get(`${geckoApiBaseUrl}/coins/markets`, { params: payload.params });
  },
  getCoinById (payload = {}) {
    return Repository.get(`${geckoApiBaseUrl}/coins/${payload.id}`, { params: payload.params })
  }
};
