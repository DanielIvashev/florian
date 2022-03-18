import {markRaw} from "vue";
import {createNotification} from "@/utils";
import coinGeckoRepository from "@/repositories/coinGeckoRepository";
import {date} from 'quasar'
export const specialCoin = {
    namespaced: true,
    state: () => {
        const visibleColumns = {
            default: ['current_price', 'name', 'price_change_percentage_24h', 'likes', 'market_cap', 'mentions', 'sentiment', 'diffusion', 'reach'],
        };
        const columns = {
            default: markRaw([
                {
                    name: 'image',
                    label: 'Logo',
                    required: true
                },
                {
                    name: 'name',
                    label: 'Name',
                    format: (val) => val,
                    sortable: {
                        handler: (a, b) => a.name.localeCompare(b.name),
                    }
                },
                {
                    name: 'market_cap',
                    label: 'Market Cap',
                    format: (val) => ('$' + val).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    field: (row) => row.market_cap,
                    sortable: {
                        handler: (a, b) => a.market_cap - b.market_cap,
                    }
                },
                {
                    name: 'current_price',
                    label: 'Current Price',
                    format: (val) => ('$' + val).replace(/\B(?=(\d{3})+(?!\d))/g, ','),
                    sortable: {
                        handler: (a, b) => a.current_price - b.current_price,
                    }
                },
                {
                    name: 'price_change_percentage_24h',
                    label: 'Price Change (24h)',
                    format: (val) => val + '%',
                    sortable: {
                        handler: (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
                    }
                },
                {
                    name: 'mentions',
                    label: 'Mentions',
                    format: (val) => '',
                    sortable: {
                        handler: (a, b) => 0,
                    }
                },
                {
                    name: 'sentiment',
                    label: 'Sentiment',
                    format: (val) => '',
                },
                {
                    name: 'diffusion',
                    label: 'Diffusion',

                },
                {
                    name: 'reach',
                    label: 'Reach',
                    format: (val) => '',
                },
                {
                    name: 'likes',
                    label: 'Like',
                    format: (val) => val,
                    field: (row) => '',
                },
                {
                    name: 'pageLink',
                    label: '',
                    required: true
                },
            ]),
        };
        const fromInitialDate = date.buildDate({ year: 2021, date: 5 });
        const toInitialDate = new Date();
        return {
            mainCoinsTable: {
                visibleColumns: visibleColumns.default,
                columns: columns.default,
                currentPage: 1,
                rowsPerPage: {
                    value: 25,
                    options: markRaw([
                        {
                            value: 25,
                            label: '25'
                        },
                        {
                            value: 50,
                            label: '50'
                        },
                        {
                            value: 100,
                            label: '100'
                        },
                        {
                            value: 150,
                            label: '150'
                        },
                        {
                            value: 200,
                            label: '200'
                        }
                    ])
                },
                timeRange: {
                    value: '24h',
                    options: markRaw([
                        {
                            value: '1h',
                            label: '1 hour'
                        },
                        {
                            value: '24h',
                            label: '24 hours'
                        },
                        {
                            value: '7d',
                            label: '7 days'
                        },
                        {
                            value: '14d',
                            label: '14 days'
                        },
                        {
                            value: '30d',
                            label: '30 days'
                        },
                        {
                            value: '200d',
                            label: '200 days'
                        },
                        {
                            value: '1y',
                            label: '1 year'
                        },
                    ])
                },
            },
            chartLoading: true,
            chartError: null,
            chartData: null,
            chartDates: {
                value: {
                    from: fromInitialDate,
                    to: toInitialDate
                }
            }
        }
    },
    mutations: {
        SET_NEW_VALUE (state, { event, table, name }) {
            if (table) {
                Object.prototype.toString.call(state[table][name]) === '[object Object]' ?
                    state[table][name].value = event :
                    state[table][name] = event;
            } else {
                state[name] = event;
            }
        },
        SET_CHART_LOADING(state) {
            state.chartLoading = true;
            state.chartError = null;
        },
        SET_CHART_ERROR(state, { error }) {
            state.chartLoading = false;
            state.chartError = error;
        },
        SET_CHART_SUCCESS(state, { chartData }) {
            state.chartData = markRaw(chartData);
            state.chartLoading = false;
            state.chartError = null;
        },
        SET_CHART_DATES(state, { chartDates: { from, to } }) {
            state.chartDates.value = {
                from,
                to
            }
        }
    },
    actions: {
        updateValue ({ state, commit, dispatch, getters }, { event, name, table }) {
            commit('SET_NEW_VALUE', { event, name, table });
        },
        loadCoinChartData({ commit, state }, { id }) {
            commit('SET_CHART_LOADING')
            let { from, to } = state.chartDates.value

            const params = {
                vs_currency: 'usd',
                from: Math.floor(from.getTime()/1000),
                to: Math.floor(to.getTime()/1000)
            }
            return coinGeckoRepository
                .getCoinChartData({ id, params })
                .then(({data, status}) => {
                    if (status !== 200 || !data) {
                        throw new Error();
                    }

                    commit('SET_CHART_SUCCESS', { chartData: data });
                    return data;
                })
                .catch(error => {
                    commit('SET_CHART_ERROR', {error});
                    createNotification({
                        type: 'error',
                        group: true,
                        message: 'Chart load failed',
                    });
                })
        },
    },
    getters: {
        getMainCoinsGeckoTableConfig(state) {
            return state.mainCoinsTable || {};
        },
        getChartLoading(state) {
            return state.chartLoading;
        },
        getChartError(state) {
            return state.chartError;
        },
        getChartData(state) {
            return state.chartData || {};
        },
        getChartDates(state) {
            return state.chartDates;
        }
    },
};

function prepareDataForChart(data= {}) {
    const lines = Object.keys(data);
    const preparedData = {};
}
