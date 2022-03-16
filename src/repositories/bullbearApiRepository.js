import Repository from './repository';

const bullbearApiBaseUrl = 'https://l7vqce33s9.execute-api.eu-central-1.amazonaws.com/dev';
const apiKey = import.meta.env.VITE_BULLBEAR_API_KEY;
export default {
    getCoinInfo (payload = {}) {
        console.log(apiKey)
        return Repository.post(`${bullbearApiBaseUrl}/coin-info`, payload.data,
            {
                params: payload.params,
                headers: {
                    ...(payload.headers && { ...payload.headers }),
                    ...(apiKey && { 'x-api-key': apiKey })
                }
            });
    },
};
