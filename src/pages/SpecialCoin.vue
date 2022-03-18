<template>
    <div class="special-coin">
        <q-btn label="Back to Dashboard" type="button" color="primary" @click="$router.push({ name: 'Dashboard' })"/>
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
            <div class="special-coin__chart-wrapper">
                <q-card class="special-coin__chart-card">
                    <q-card-section>
                        <q-btn icon="event" color="primary" label="Choose date range" class="special-coin__chart-date-range">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale" ref="popupChartDateRange">
                                <q-date
                                    range
                                    no-unset
                                    mask="YYYY-MM-DD"
                                    :model-value="getChartDates"
                                    @update:model-value="event => (updateChartDates(event), this.$refs.popupChartDateRange.hide())"
                                />
                            </q-popup-proxy>
                        </q-btn>
                        <custom-chart :data="getChartData" :loading="getChartLoading" :error="getChartError" :dates="getChartDates" :coin-name="getCoinGecko.name" />
                    </q-card-section>
                </q-card>
            </div>
            <custom-table
                type="big"
                :coins="getCoinsGecko"
                :columns="getMainCoinsGeckoTableConfig.columns"
                :loading="getCoinsGeckoLoading"
                :time-range="getMainCoinsGeckoTableConfig.timeRange"
                :rows-per-page="getMainCoinsGeckoTableConfig.rowsPerPage"
                :visible-columns="getMainCoinsGeckoTableConfig.visibleColumns"
                :current-page="getMainCoinsGeckoTableConfig.currentPage"
                :liked-coins-ids="getLikedCoinsIds"
                :max-page="bigTablePagesCount"
                @update:current-page="(event) => twoWayBindingsHandler({ event, name: 'currentPage', table: 'mainCoinsTable' })"
                @update:time-range="(event) => twoWayBindingsHandler({ event, name: 'timeRange', table: 'mainCoinsTable' })"
                @update:visible-columns="(event) => twoWayBindingsHandler({ event, name: 'visibleColumns', table: 'mainCoinsTable' })"
                @update:liked-coins-ids="updateLikedCoins"
            />
        </div>
    </div>
</template>
<script>
import Table from "@/components/Table.vue";
import Chart from "@/components/Chart.vue";
import {date, debounce} from 'quasar'

const logoPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
const ALL_COINS_COUNT = 13100;
export default {
    name: 'SpecialCoin',
    components: {
        CustomTable: Table,
        CustomChart: Chart
    },
    data() {
        return {
            logoPlaceholder,
        }
    },
    computed: {
        getLikedCoinsIds() {
            return this.$store.getters['getLikedCoinsIds'] || [];
        },
        getLikedCoins() {
            return this.$store.getters['getLikedCoins'] || []
        },
        getMainCoinsGeckoTableConfig() {
            return this.$store.getters['specialCoin/getMainCoinsGeckoTableConfig'];
        },
        getCoinsGecko() {
            return this.$store.getters['getCoinsGecko'] || [];
        },
        getCoinsGeckoSmall() {
            return (this.$store.getters['getCoinsGecko'] || []).slice(0, 4);
        },
        getCoinsGeckoLoading() {
            return this.$store.getters['getCoinsGeckoLoading'] || false;
        },
        getCoinsGeckoError() {
            return this.$store.getters['getCoinsGeckoError'];
        },
        bigTablePagesCount() {
            return Math.floor(ALL_COINS_COUNT / this.getMainCoinsGeckoTableConfig.rowsPerPage.value);
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
        getChartLoading() {
            return this.$store.getters['specialCoin/getChartLoading']
        },
        getChartData() {
            return this.$store.getters['specialCoin/getChartData']
        },
        getChartError() {
            return this.$store.getters['specialCoin/getChartError']
        },
        getChartDates() {
            const {value: {from, to}} = this.$store.getters['specialCoin/getChartDates']
            const preparedFrom = date.formatDate(from.getTime(), 'YYYY-MM-DD')
            const preparedTo = date.formatDate(to.getTime(), 'YYYY-MM-DD')
            return {
                from: preparedFrom,
                to: preparedTo
            }
        },
        coinId() {
            return (this.$route.params || {}).id
        }
    },
    watch: {
        'getMainCoinsGeckoTableConfig.timeRange.value'(val) {
            this.currentPage = 1;
            this.loadCoinsMarket();
        },
        'getMainCoinsGeckoTableConfig.rowsPerPage.value'(val) {
            this.loadCoinsMarket();
        },
        'getMainCoinsGeckoTableConfig.currentPage'(val) {
            this.loadCoinsMarket();
        },
        coinId(val) {
            if (val) {
                this.initial();
            }
        }
    },
    created() {
        this.loadGraphicData = debounce(this.loadGraphicData, 1000);
        this.initial();
    },
    methods: {
        twoWayBindingsHandler({event, name, table}) {
            this.$store.dispatch('specialCoin/updateValue', {event, name, table})
        },
        loadCoinsMarket() {
            return this.$store.dispatch('loadCoinsMarket', {
                params: {
                    ...(!!this.getMainCoinsGeckoTableConfig.timeRange.value && {price_change_percentage: this.getMainCoinsGeckoTableConfig.timeRange.value}),
                    page: this.getMainCoinsGeckoTableConfig.currentPage,
                    per_page: this.getMainCoinsGeckoTableConfig.rowsPerPage.value,
                    price_change_percentage: this.getMainCoinsGeckoTableConfig.timeRange.value
                }
            })
        },
        updateLikedCoins(coin) {
            this.$store.dispatch('updateLikedCoins', {coin})
        },
        updateChartDates(obj) {
            if (obj) {
                const { from, to } = obj
                const datesToDateObj = {
                    from: date.extractDate(from, 'YYYY-MM-DD'),
                    to: date.extractDate(to, 'YYYY-MM-DD')
                }
                this.$store.commit('specialCoin/SET_CHART_DATES', { chartDates: datesToDateObj })
                this.loadGraphicData();
            }
        },
        initial() {
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
            return this.$store.dispatch('specialCoin/loadCoinChartData', {id: this.coinId});
        },
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/special-coin.scss';
</style>
