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
                    label="Personality"
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
                                @update:liked-coins-ids="updateLikedCoins"
                            />
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <transition name="router">
                    <q-expansion-item
                        v-if="getLikedCoins.length"
                        v-model="isLikedCoinsTableOpen"
                        popup
                        icon="favorite_border"
                        label="Liked coins"
                    >
                        <q-card>
                            <q-card-section>
                                <custom-table
                                    type="small"
                                    :coins="getLikedCoins"
                                    :columns="getLikedCoinsGeckoTableConfig.columns"
                                    :loading="getLikedCoinsGeckoLoading"
                                    :visible-columns="getLikedCoinsGeckoTableConfig.visibleColumns"
                                    :liked-coins-ids="getLikedCoinsIds"
                                    @update:visible-columns="(event) => twoWayBindingsHandler({ event, name: 'visibleColumns', table: 'secondaryCoinsTable' })"
                                    @update:liked-coins-ids="updateLikedCoins"
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
                @update:liked-coins-ids="updateLikedCoins"
            />
        </div>
    </div>
</template>

<script>
import Table from '@/components/Table.vue';

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
        }
    },
    computed: {
        getLikedCoinsGeckoTableConfig () {
            return this.$store.getters['dashboard/getLikedCoinsGeckoTableConfig'];
        },
        getLikedCoinsIds () {
           return this.$store.getters['getLikedCoinsIds'] || [];
        },
        getLikedCoins () {
            return this.$store.getters['getLikedCoins'] || []
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

    },
    created() {
        this.loadCoinsMarket();
    },
    mounted () {
        if (window.MemberStack) {
            window.MemberStack.reload();
        }
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
        updateLikedCoins(coin) {
            this.$store.dispatch('updateLikedCoins', { coin })
        }
    }
};
</script>
<style lang="scss" scoped>
@import '@/styles/dashboard.scss';
</style>
