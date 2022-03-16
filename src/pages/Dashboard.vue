<template>
    <div class="dashboard">
        <div class="dashboard__content">
            <h1 class="dashboard__title">
                Dashboard
            </h1>
            <q-list style="margin-bottom: 10px">
                <q-expansion-item
                    v-model="isSmallTableOpen"
                    popup
                    icon="perm_identity"
                    label="Small Table"
                >
                    <q-card>
                        <q-card-section>
                            <custom-table
                                :coins="getCoinsGeckoSmall"
                                :columns="smallTable.columns"
                                :loading="getCoinsGeckoLoading"
                                :visible-columns="smallTable.visibleColumns"
                                v-model:liked-row-ids="likedCoinsIds"
                                type="small"
                            />
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <transition name="router">
                    <q-expansion-item
                        v-if="likedCoins.length"
                        v-model="isLikedCoinsTableOpen"
                        popup
                        icon="perm_identity"
                        label="Liked coins Table"
                    >
                        <q-card>
                            <q-card-section>
                                <custom-table
                                    :coins="likedCoins"
                                    :columns="likedCoinsGeckoTable.columns"
                                    :loading="getLikedCoinsGeckoLoading"
                                    :visible-columns="likedCoinsGeckoTable.visibleColumns"
                                    v-model:liked-row-ids="likedCoinsIds"
                                    type="small"
                                />
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </transition>
            </q-list>
            <custom-table
                :coins="getCoinsGecko"
                :columns="bigTable.columns"
                :loading="getCoinsGeckoLoading"
                :time-range="bigTable.timeRange"
                :rows-per-page="bigTable.rowsPerPage"
                :visible-columns="bigTable.visibleColumns"
                v-model:current-page="bigTable.currentPage"
                v-model:liked-row-ids="likedCoinsIds"
                :max-page="bigTablePagesCount"
                type="big"
            />
            <form ms-update="profile" style="display: none">
                <input type="text" ms-field="liked-coins" hidden aria-hidden="true" ref="likedCoinsInput">
            </form>
        </div>
    </div>
</template>

<script>
import Table from "@/components/Table.vue";
import {markRaw} from "vue";
import {debounce} from 'quasar'

const ALL_COINS_COUNT = 13100;

export default {
    name: 'Dashboard',
    components: {
        CustomTable: Table,
    },
    data() {
        return {
            isSmallTableOpen: false,
            isLikedCoinsTableOpen: false,
            likedCoinsGeckoTable: {
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
                        sortable: {
                            handler: (a, b) => a.name.localeCompare(b.name),
                        }
                    },
                    {
                        name: 'market_cap',
                        label: 'Market Cap',
                        format: (val) => val + '$',
                        field: (row) => row.market_cap,
                        sortable: {
                            handler: (a, b) => a.market_cap - b.market_cap,
                        }
                    },
                    {
                        name: 'current_price',
                        label: 'Current Price',
                        format: (val) => val + '$',
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
                visibleColumns: ['current_price', 'name', 'price_change_percentage_24h', 'likes', 'market_cap', 'mentions', 'sentiment', 'diffusion', 'reach'],
            },
            bigTable: {
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
                        sortable: {
                            handler: (a, b) => a.name.localeCompare(b.name),
                        }
                    },
                    {
                        name: 'market_cap',
                        label: 'Market Cap',
                        format: (val) => '$' + val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
                        field: (row) => row.market_cap,
                        sortable: {
                            handler: (a, b) => a.market_cap - b.market_cap,
                        }
                    },
                    {
                        name: 'current_price',
                        label: 'Current Price',
                        format: (val) => '$' + val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
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
                visibleColumns: ['current_price', 'name', 'price_change_percentage_24h', 'likes', 'market_cap', 'mentions', 'sentiment', 'diffusion', 'reach'],
            },
            smallTable: {
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
                        sortable: {
                            handler: (a, b) => a.name.localeCompare(b.name),
                        }
                    },
                    {
                        name: 'market_cap',
                        label: 'Market Cap',
                        format: (val) => '$' + val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
                        field: (row) => row.market_cap,
                        sortable: {
                            handler: (a, b) => a.market_cap - b.market_cap,
                        }
                    },
                    {
                        name: 'current_price',
                        label: 'Current Price',
                        format: (val) => '$' + val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"),
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
                visibleColumns: ['current_price', 'name', 'price_change_percentage_24h', 'likes', 'market_cap', 'mentions', 'sentiment', 'diffusion', 'reach'],
            },
            likedCoins: [],
            likedCoinsIds: []
        }
    },
    computed: {
        getMemberFromMemberstack() {
            return this.$store.getters['getMemberFromMemberstack'] || {};
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
            return Math.floor(ALL_COINS_COUNT / this.bigTable.rowsPerPage.value);
        },
        getLikedCoinsGeckoLoading() {
            return false;
        },
    },
    watch: {
        'bigTable.timeRange.value'(val) {
            this.currentPage = 1;
            this.loadCoinsMarket();
        },
        'bigTable.rowsPerPage.value'(val) {
            this.loadCoinsMarket();
        },
        'bigTable.currentPage'(val) {
            this.loadCoinsMarket();
        },
        getCoinsGecko (val) {
            this.setLikedCoinsFromBackend()
        },
        likedCoinsIds (val, oldVal) {
            const findDifferentElements = val.filter(e => !~oldVal.indexOf(e)).concat(oldVal.filter(e => !~val.indexOf(e)))
            const uniqueIds = [...new Set(findDifferentElements)];
            uniqueIds.forEach(id => {
                const savedCoinsFromBackend = JSON.parse(this.$refs.likedCoinsInput.value || '[]');
                const coinDataById = [...this.getCoinsGecko, ...savedCoinsFromBackend].find(coin => coin.id === id);
                if (coinDataById) {
                    if (val.includes(id)) {
                        const copyOfLikedCoins = [...this.likedCoins];
                        copyOfLikedCoins.unshift(coinDataById)
                        this.likedCoins = copyOfLikedCoins
                    } else {
                        this.likedCoins = this.likedCoins.filter(coin => coin.id !== id)
                    }
                }
            })
        },
        likedCoins (val) {
            const reversedSaveVersion = [...val].reverse()
            this.updateLikedRowsInMemberstack(reversedSaveVersion);
        }
    },
    created() {
        this.updateLikedRowsInMemberstack = debounce(this.updateLikedRowsInMemberstack, 1000)
        this.loadCoinsMarket();
    },
    mounted () {
        window.MemberStack.reload();
    },
    methods: {
        loadCoinsMarket() {
            return this.$store.dispatch('loadCoinsMarket', {
                params: {
                    ...(!!this.bigTable.timeRange.value && {price_change_percentage: this.bigTable.timeRange.value}),
                    page: this.bigTable.currentPage,
                    per_page: this.bigTable.rowsPerPage.value,
                    price_change_percentage: this.bigTable.timeRange.value
                }
            })
        },
        updateLikedRowsInMemberstack(val) {
            const likedCoinsToString = JSON.stringify(val);
            this.$store.dispatch('updateProfileInfo', { fields: [{value: likedCoinsToString, name: 'liked-coins'}] })
        },
        setLikedCoinsFromBackend () {
            if (this.getCoinsGecko.length) {
                this.likedCoinsIds = JSON.parse(this.$refs.likedCoinsInput.value || '[]').map(coin => coin.id)
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/styles/dashboard.scss';
</style>
