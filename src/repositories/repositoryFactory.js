import CoinGeckoRepository from './coinGeckoRepository';
import BullbearApiRepository from './bullbearApiRepository';

const repositories = {
    gecko: CoinGeckoRepository,
    bullbear: BullbearApiRepository
};

export default {
    get: (name) => repositories[name],
};
