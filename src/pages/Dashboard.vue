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
                                type="small"
                                :coins="getCoinsGeckoSmall"
                                :columns="getSecondaryCoinsGeckoTableConfig.columns"
                                :loading="getCoinsGeckoLoading"
                                :visible-columns="getSecondaryCoinsGeckoTableConfig.visibleColumns"
                                :liked-coins-ids="getLikedCoinsIds"
                                @update:visible-columns="(event) => twoWayBindingsHandler({ event, name: 'visibleColumns', table: 'likedCoinsTable' })"
                                @update:liked-coins-ids="(event) => twoWayBindingsHandler({ event, name: 'likedCoinsIds' })"
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
                                    type="small"
                                    :coins="likedCoins"
                                    :columns="getLikedCoinsGeckoTableConfig.columns"
                                    :loading="getLikedCoinsGeckoLoading"
                                    :visible-columns="getLikedCoinsGeckoTableConfig.visibleColumns"
                                    :liked-coins-ids="getLikedCoinsIds"
                                    @update:visible-columns="(event) => twoWayBindingsHandler({ event, name: 'visibleColumns', table: 'secondaryCoinsTable' })"
                                    @update:liked-row-ids="(event) => twoWayBindingsHandler({ event, name: 'likedCoinsIds' })"
                                />
                            </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </transition>
            </q-list>
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
                @update:liked-coins-ids="(event) => twoWayBindingsHandler({ event, name: 'likedCoinsIds' })"
            />
            <form ms-update="profile" style="display: none">
                <input type="text" ms-field="liked-coins" hidden aria-hidden="true" ref="likedCoinsInput">
            </form>
        </div>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';
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
            likedCoins: [],
        }
    },
    computed: {
        getLikedCoinsGeckoTableConfig () {
            return this.$store.getters['dashboard/getLikedCoinsGeckoTableConfig'];
        },
        getLikedCoinsIds () {
           return this.$store.getters['dashboard/getLikedCoinsIds'] || [];
        },
        getMainCoinsGeckoTableConfig () {
            return this.$store.getters['dashboard/getMainCoinsGeckoTableConfig'];
        },
        getSecondaryCoinsGeckoTableConfig () {
            return this.$store.getters['dashboard/getSecondaryCoinsGeckoTableConfig'];
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
        getLikedCoinsGeckoLoading() {
            return false;
        },
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
        getCoinsGecko (val) {
            this.setLikedCoinsFromBackend()
        },
        getLikedCoinsIds (val, oldVal) {
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
        twoWayBindingsHandler ({ event, name, table }) {
            this.$store.dispatch('dashboard/updateValue', { event, name, table })
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
        updateLikedRowsInMemberstack(val) {
            const likedCoinsToString = JSON.stringify(val);
            this.$store.dispatch('updateProfileInfo', { fields: [{value: likedCoinsToString, name: 'liked-coins'}] })
        },
        setLikedCoinsFromBackend () {
            if (this.getCoinsGecko.length) {
                const value = JSON.parse(this.$refs.likedCoinsInput.value || '[]').map(coin => coin.id)
                this.twoWayBindingsHandler({ event: value, name: 'likedCoinsIds' })
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/styles/dashboard.scss';
</style>
