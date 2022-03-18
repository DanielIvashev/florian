import {markRaw} from "vue";

export const dashboard = {
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
                        sortable: {
                            handler: (a, b) => 0,
                        }
                    },
                    {
                        name: 'diffusion',
                        label: 'Diffusion',
                        format: (val) => '',
                        sortable: {
                            handler: (a, b) => 0,
                        }
                    },
                    {
                        name: 'reach',
                        label: 'Reach',
                        format: (val) => '',
                        sortable: {
                            handler: (a, b) => 0,
                        }
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
        }
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
            secondaryCoinsTable: {
                visibleColumns: visibleColumns.default,
                columns: columns.default,
            },
            likedCoinsTable: {
                visibleColumns: visibleColumns.default,
                columns: columns.default,
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
        }
    },
    actions: {
        updateValue ({ state, commit, dispatch }, { event, name, table }) {
            commit('SET_NEW_VALUE', { event, name, table });
        },
    },
    getters: {
        getLikedCoinsGeckoTableConfig(state) {
            return state.likedCoinsTable || {};
        },
        getMainCoinsGeckoTableConfig(state) {
            return state.mainCoinsTable || {};
        },
        getSecondaryCoinsGeckoTableConfig(state) {
            return state.secondaryCoinsTable || {};
        },
    },
};
