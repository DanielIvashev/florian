<template>
    <div class="special-coin">
        <q-btn label="Back to Dashboard" type="button" color="primary" @click="$router.push({ name: 'Dashboard' })" />
        <transition name="router" mode="in-out">
            <div v-show="getCoinGeckoLoading" class="special-coin__loader">
            <q-inner-loading showing>
                <q-spinner-gears
                    size="50px"
                    color="primary"
                />
            </q-inner-loading>
        </div>
        </transition>
        <div class="special-coin__content">
            <div v-if="getCoinGecko.id">
                <div class="special-coin__title-wrapper">
                    <q-img
                        class="special-coin__title-image"
                        :src="getCoinGecko.image.large"
                        :alt="getCoinGecko.name + ' image'"
                        :logo-placeholder="logoPlaceholder"
                        spinner-color="white"
                    />
                    <h1 class="special-coin__title-text">
                        {{ getCoinGecko.name }}
                    </h1>
                </div>
            </div>
            <div class="special-coin__graphic-wrapper">
                <div ref="graphic" id="graphic" class="special-coin__graphic"></div>
                <transition name="router" mode="in-out">
                    <q-skeleton v-show="graphicLoading" class="special-coin__graphic-skeleton" animation-speed="500" />
                </transition>
            </div>
            <table-big
                :coins="getCoinsGecko"
                :columns="columns"
                :loading="getCoinsGeckoLoading"
                :time-range="timeRange"
                :rows-per-page="rowsPerPage"
                :visible-columns="visibleColumns"
                v-model:current-page="currentPage"
                v-model:liked-row-ids="likedRowIds"
                :max-page="bigTablePagesCount"
                type="big"
            />
        </div>
    </div>
</template>
<script>
import Table from "@/components/Table.vue";
import { markRaw } from "vue";

const logoPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
const ALL_COINS_COUNT = 13100;
export default {
    name: 'SpecialCoin',
    components: {
      TableBig: Table
    },
    data() {
        return {
            logoPlaceholder,
            graphicLoading: true,
            columns: markRaw([
                {
                    name: 'image',
                    label: 'Logo',
                    required: true
                },
                {
                    name: 'name',
                    label: 'Name',
                    format: (val) => val,
                    field: (row) => row.name,
                    sortable: {
                        handler: (a, b) => a.name.localeCompare(b.name),
                    }
                },
                {
                    name: 'current_price',
                    label: 'Current Price',
                    format: (val) => val,
                    field: (row) => row.current_price,
                    sortable: {
                        handler: (a, b) => a.current_price - b.current_price,
                    }
                },
                {
                    name: 'symbol',
                    label: 'Symbol',
                    format: (val) => val,
                    field: (row) => row.symbol,
                    sortable: {
                        handler: (a, b) => a.symbol - b.symbol,
                    }
                },
                {
                    name: 'price_change_percentage_24h',
                    label: 'Price Change (24h)',
                    format: (val) => val + '%',
                    field: (row) => row.price_change_percentage_24h,
                    sortable: {
                        handler: (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
                    }
                },
                {
                    name: 'market_cap',
                    label: 'Market Cap',
                    format: (val) => val + '%',
                    field: (row) => row.market_cap,
                    sortable: {
                        handler: (a, b) => a.market_cap - b.market_cap,
                    }
                },
                {
                    name: 'likes',
                    label: 'Like',
                    format: (val) => val,
                    field: (row) => '',
                    sortable: {
                        handler: (a, b) => {
                            if (!this.bigTable.likedRowIds || !this.bigTable.likedRowIds.length) {
                                return 0;
                            }
                            const hasLike = (this.likedRowIds || []).includes(a.id);
                            return hasLike ? 1 : -1
                        },
                    }
                },
                {
                    name: 'pageLink',
                    label: '',
                    required: true
                },
            ]),
            visibleColumns: ['current_price', 'name', 'price_change_percentage_24h', 'likes', 'market_cap', 'symbol'],
            likedRowIds: [],
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
            }
        }
    },
    computed: {
        getCoinsGecko() {
            return this.$store.getters['getCoinsGecko'] || [];
        },
        getCoinsGeckoLoading() {
            return this.$store.getters['getCoinsGeckoLoading'] || false;
        },
        getCoinsGeckoError() {
            return this.$store.getters['getCoinsGeckoError'];
        },
        bigTablePagesCount() {
            return Math.floor(ALL_COINS_COUNT / this.rowsPerPage.value);
        },
        getCoinGecko() {
            return this.$store.getters['getCoinGecko'] || {};
        },
        getCoinGeckoLoading() {
            return this.$store.getters['getCoinGeckoLoading'] || false;
        },
        getCoinGeckoError() {
            return this.$store.getters['getCoinGeckoError'];
        },
        coinId() {
            return (this.$route.params || {}).id
        }
    },
    watch: {
        'timeRange.value'(val) {
            this.currentPage = 1;
            this.loadCoinsMarket();
        },
        'rowsPerPage.value'(val) {
            this.loadCoinsMarket();
        },
        currentPage(val) {
            this.loadCoinsMarket();
        },
        coinId(val) {
            if (val) {
                this.initial();
            }
        }
    },
    created () {
        this.initial();
    },
    methods: {
        initial () {
            this.loadCoinById()
                .then(() => {
                    return this.loadGraphicData();
                })
                .then(() => {
                    this.loadCoinsMarket();
                })
        },
        loadCoinById() {
            return this.$store.dispatch('loadCoinById', {
                id: this.coinId,
                params: {}
            })
        },
        loadGraphicData() {
            this.graphicLoading = true;
            Plotly.d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv", (err, rows) => {
                function unpack(rows, key) {
                    return rows.map(function (row) {
                        return row[key];
                    });
                }
                const trace1 = {
                    type: "scatter",
                    mode: "lines",
                    name: `${this.getCoinGecko.name} price`,
                    x: unpack(rows, 'Date'),
                    y: unpack(rows, 'AAPL.High'),
                    line: {color: '#17BECF'}
                }
                const trace2 = {
                    type: "scatter",
                    mode: "lines",
                    name: `${this.getCoinGecko.name} mentions (indexed)`,
                    x: unpack(rows, 'Date'),
                    y: unpack(rows, 'AAPL.Low'),
                    line: {color: '#3e5c50'}
                }
                const data = [trace1, trace2];
                const layout = {
                    legend: {
                        x: 0,
                        y: -0.6
                    },
                    title: `${this.getCoinGecko.name} development`,
                    xaxis: {
                        autorange: true,
                        range: ['2015-02-17', '2017-02-16'],
                        rangeselector: {
                            buttons: [
                                {
                                    count: 1,
                                    label: '1m',
                                    step: 'month',
                                    stepmode: 'backward'
                                },
                                {
                                    count: 6,
                                    label: '6m',
                                    step: 'month',
                                    stepmode: 'backward'
                                },
                                {step: 'all'}
                            ]
                        },
                        rangeslider: {range: ['2015-02-17', '2017-02-16']},
                        type: 'date'
                    },
                    yaxis: {
                        autorange: true,
                        range: [86.8700008333, 138.870004167],
                        type: 'linear'
                    }
                };
                setTimeout(() => {
                    Plotly.newPlot(this.$refs.graphic || 'graphic', data, layout, { displaylogo: false, responsive: true });
                    this.$nextTick(() => {
                        this.graphicLoading = false;
                    })
                }, 1000)

            })
        },
        loadCoinsMarket() {
            return this.$store.dispatch('loadCoinsMarket', {
                params: {
                    ...(!!this.timeRange.value && {price_change_percentage: this.timeRange.value}),
                    page: this.currentPage,
                    per_page: this.rowsPerPage.value,
                    price_change_percentage: this.timeRange.value
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/special-coin.scss';
</style>
