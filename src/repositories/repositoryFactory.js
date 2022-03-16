import CoinGeckoRepository from './coinGeckoRepository';
import BullbearApiRepository from './BullbearApiRepository';

const repositories = {
    gecko: CoinGeckoRepository,
    bullbear: BullbearApiRepository
};

export default {
    get: (name) => repositories[name],
};
