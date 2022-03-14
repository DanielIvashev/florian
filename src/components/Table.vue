<template>
    <div class="container table">
        <div v-if="type === 'big'" class="table__controls">
            <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="rowsPerPage.value"
                outlined
                dense
                options-dense
                emit-value
                map-options
                :options="rowsPerPage.options"
                label="Per Page"
                style="min-width: 100px"
            />
            <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="timeRange.value"
                outlined
                clearable
                dense
                options-dense
                emit-value
                map-options
                :options="timeRange.options"
                style="min-width: 200px"
            >
                <template v-slot:prepend>
                    <q-icon name="event"/>
                </template>
            </q-select>
            <q-select
                transition-show="jump-up"
                transition-hide="jump-up"
                v-model="visibleColumns"
                multiple
                outlined
                dense
                options-dense
                display-value="Filter"
                emit-value
                map-options
                :options="notRequiredCols"
                option-value="name"
                style="min-width: 150px"
            />
            <q-input
                outlined
                v-model="searchQuery"
                placeholder="Search"
                dense
                debounce="300"
            >
                <template v-slot:append>
                    <q-icon name="search"/>
                </template>
            </q-input>
        </div>
        <q-markup-table class="table__table" :class="{ 'table__table--small': type === 'small' }" ref="table">
            <thead>
            <tr>
                <template v-for="column in columns" :key="column.name">
                    <th
                        v-show="column.name in filteredColumns"
                        class="table__th"
                        :class="{ 'has-sort': column.sortable }"
                        @click="sort({ column })"
                    >
                        {{ column.label }}
                        <q-icon
                            v-if="column.sortable"
                            :name="`arrow_upward`"
                            class="table__sort-icon"
                            :class="{
                            'sorted': currentSort.column === column.name,
                            'sorted-ad': currentSort.column === column.name && currentSort.direction === 'ad',
                            'sorted-da': currentSort.column === column.name && currentSort.direction === 'da',
                        }"
                        />
                    </th>
                </template>
            </tr>
            <tr v-show="loading" class="q-table__progress table__progress">
                <th class="relative-position" colspan="8">
                    <div class="q-linear-progress text-primary q-table__linear-progress" role="progressbar"
                         aria-valuemin="0" aria-valuemax="1" style="--q-linear-progress-speed:2100ms;">
                        <div
                            class="q-linear-progress__track absolute-full q-linear-progress__track--with-transition q-linear-progress__track--light bg-transparent"
                            style="transform: scale3d(1, 1, 1);"></div>
                        <div
                            class="q-linear-progress__model absolute-full q-linear-progress__model--with-transition q-linear-progress__model--indeterminate"
                            style="transform: scale3d(1, 1, 1);"></div>
                    </div>
                </th>
            </tr>
            </thead>
            <TransitionGroup tag="tbody" name="list" class="table__t-body">
                <tr v-for="row in rows" :key="row.id">
                    <template v-for="column in columns" :key="column.name">
                        <td class="table__td" v-show="column.name in filteredColumns">
                            <template v-if="column.name === 'image'">
                                <q-img
                                    class="table__td-image"
                                    :src="row[column.name]"
                                    :alt="column.name"
                                    :logo-placeholder="logoPlaceholder"
                                    spinner-color="white"
                                />
                            </template>
                            <template v-else-if="column.name === 'likes'">
                                <q-checkbox
                                    class="table__like-icon"
                                    :model-value="likedRowIds"
                                    @update:model-value="event => $emit('update:liked-row-ids', event)"
                                    checked-icon="favorite"
                                    unchecked-icon="favorite_border"
                                    size="30px"
                                    :val="row.id"
                                />
                            </template>
                            <template v-else-if="column.name === 'pageLink'">
                                <router-link
                                    class="table__page-link"
                                    :to="{ name: 'SpecialCoin', params: { id: row.id } }"
                                >
                                    Page
                                </router-link>
                            </template>
                            <template v-else>
                                {{ column.format ? column.format(row[column.name]) : row[column.name] }}
                            </template>
                        </td>
                    </template>
                </tr>
            </TransitionGroup>
        </q-markup-table>
        <div v-if="type === 'big'" class="table__pagination">
            <q-pagination
                :model-value="currentPage"
                @update:model-value="paginationHandler"
                color="primary"
                :max="maxPage"
                :max-pages="5"
                boundary-numbers
                :disable="loading"
            />
        </div>
    </div>
</template>
<script>
import {scroll} from 'quasar'
import {filterBy} from "@/utils";
import {markRaw} from "vue";

const {setVerticalScrollPosition} = scroll

const logoPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="

export default {
    name: 'Table',
    props: {
        coins: {
            type: Array,
            default: () => ([])
        },
        columns: {
            type: Array,
            default: () => ([])
        },
        loading: {
            type: Boolean,
            default: false
        },
        timeRange: {
            type: Object,
            default: () => ({})
        },
        rowsPerPage: {
            type: Object,
            default: () => ({})
        },
        likedRowIds: {
            type: Array,
            default: () => ({})
        },
        currentPage: {
            type: Number,
            default: 1
        },
        visibleColumns: {
            type: Array,
            default: () => ([])
        },
        maxPage: {
            type: Number,
            default: 132
        },
        type: {
            type: String,
            default: 'big'
        }
    },
    emits: ['on-search', 'update:current-page', 'update:liked-row-ids', 'update:search-query'],
    data() {
        return {
            currentSort: {
                direction: null,
                column: null,
            },
            logoPlaceholder,
            rows: [],
            searchQuery: ''
        }
    },
    computed: {
        notRequiredCols() {
            return this.columns.filter(col => !col.required)
        },
        filteredColumns() {
            return this.columns.reduce((acc, col) => {
                if (col.required || this.visibleColumns.includes(col.name)) {
                    acc[col.name] = {};
                }
                return acc;
            }, {})
        },
    },
    methods: {
        sort({column}) {
            if (!column.sortable) return;
            if (!this.currentSort.column || this.currentSort.column !== column.name) {
                this.currentSort.column = column.name;
                this.currentSort.direction = 'ad'
                this.rows = this.objectWithMarkRaw([...this.rows].sort(column.sortable.handler));
            } else if (this.currentSort.column === column.name) {
                if (this.currentSort.direction === 'ad') {
                    this.currentSort.column = column.name;
                    this.currentSort.direction = 'da'
                    this.rows = this.objectWithMarkRaw([...this.rows].reverse());
                } else if (this.currentSort.direction === 'da') {
                    this.currentSort.column = null;
                    this.currentSort.direction = null;
                    this.resetLocalRows()
                }
            }
        },
        objectWithMarkRaw(object) {
            return markRaw(object);
        },
        resetLocalRows() {
            this.rows = markRaw(this.coins);
        },
        paginationHandler(event) {
            this.$emit('update:current-page', event);
            setVerticalScrollPosition(this.$refs.table, 0)
        }
    },
    mounted() {
        if (!this.rows.length && !this.loading && this.coins.length) {
            this.resetLocalRows();
        }
    },
    watch: {
        coins(val, oldVal) {
            this.resetLocalRows();
        },
        searchQuery(val) {
            const searchByTheseFields = ['symbol', 'name'];
            const filteredObj = {};
            for (let i = 0; i < this.coins.length; i++) {
                for (let j = 0; j < searchByTheseFields.length; j++) {
                    if (this.coins[i][searchByTheseFields[j]]) {
                        if ((this.coins[i][searchByTheseFields[j]] + '').toLowerCase().includes(val.trim().toLowerCase())) {
                            filteredObj[this.coins[i].id] = this.coins[i];
                        }
                    }
                }
            }
            this.rows = this.objectWithMarkRaw(Object.values(filteredObj));
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/table.scss';
</style>
