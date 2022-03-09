import CoinGeckoRepository from './coinGeckoRepository';

const repositories = {
  gecko: CoinGeckoRepository,
};

export default {
  get: (name) => repositories[name],
};
