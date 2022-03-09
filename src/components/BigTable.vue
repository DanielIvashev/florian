<template>
  <div class="container big-table">
<!--    <q-table-->
<!--      class="big-table__table"-->
<!--      title="Coins Markets"-->
<!--      :loading="loading"-->
<!--      :rows="coins"-->
<!--      :columns="columns"-->
<!--      row-key="name"-->
<!--      :filter="searchQuery"-->
<!--      :visible-columns="visibleColumns"-->
<!--      :pagination="pagination"-->
<!--      @update:pagination="updatedPagination"-->
<!--    >-->
<!--      <template v-slot:top-right>-->
<!--        <div class="big-table__table-top-right">-->
<!--          <q-select-->
<!--            v-model="visibleColumns"-->
<!--            multiple-->
<!--            outlined-->
<!--            dense-->
<!--            options-dense-->
<!--            display-value="Filter"-->
<!--            emit-value-->
<!--            map-options-->
<!--            :options="notRequiredCols"-->
<!--            option-value="name"-->
<!--            style="min-width: 150px"-->
<!--          />-->
<!--          <q-input outlined v-model="searchQuery" placeholder="Search"  dense debounce="200">-->
<!--            <template v-slot:append>-->
<!--              <q-icon name="search" />-->
<!--            </template>-->
<!--          </q-input>-->
<!--        </div>-->
<!--      </template>-->
<!--      <template v-slot:body="props">-->
<!--        <q-tr :props="props">-->
<!--          <q-td-->
<!--            v-for="col in props.cols"-->
<!--            :key="col.name"-->
<!--            :props="props"-->
<!--          >-->
<!--            <template v-if="col.name === 'img'" >-->
<!--              <q-img-->
<!--                class="big-table__td-image"-->
<!--                :src="col.value"-->
<!--                :alt="col.value"-->
<!--                :logo-placeholder="logoPlaceholder"-->
<!--                spinner-color="white"-->
<!--              />-->
<!--            </template>-->
<!--            <template v-else>-->
<!--              {{ col.value }}-->
<!--            </template>-->
<!--          </q-td>-->
<!--        </q-tr>-->
<!--      </template>-->
<!--    </q-table>-->
    <div class="big-table__controls">
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
      <q-input outlined v-model="searchQuery" placeholder="Search" dense debounce="300">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <q-markup-table class="big-table__table">
      <thead>
        <tr>
          <th
            v-for="column in filteredColumns"
            :key="column.name"
            class="big-table__th"
            :class="{ 'has-sort': column.sortable }"
            @click="sort({ column })"
          >
            {{ column.label }}
            <q-icon
              v-if="column.sortable"
              :name="`arrow_upward`"
              class="big-table__sort-icon"
              :class="{
                'sorted': currentSort.column === column.name,
                'sorted-ad': currentSort.column === column.name && currentSort.direction === 'ad',
                'sorted-da': currentSort.column === column.name && currentSort.direction === 'da',
              }"
            />
          </th>
        </tr>
        <tr v-show="loading" class="q-table__progress">
          <th class="relative-position" colspan="8">
            <div class="q-linear-progress text-primary q-table__linear-progress" role="progressbar" aria-valuemin="0" aria-valuemax="1" style="--q-linear-progress-speed:2100ms;">
              <div class="q-linear-progress__track absolute-full q-linear-progress__track--with-transition q-linear-progress__track--light bg-transparent" style="transform: scale3d(1, 1, 1);"></div>
              <div class="q-linear-progress__model absolute-full q-linear-progress__model--with-transition q-linear-progress__model--indeterminate" style="transform: scale3d(1, 1, 1);"></div>
            </div>
          </th>
        </tr>
      </thead>
      <TransitionGroup tag="tbody" name="list" clas="big-table__t-body">
        <tr v-for="row in rows" :key="row.id">
          <td v-for="column in filteredColumns" :key="column.name" class="big-table__td">
            <template v-if="column.name === 'image'">
              <q-img
                class="big-table__td-image"
                :src="row[column.name]"
                :alt="column.name"
                :logo-placeholder="logoPlaceholder"
                spinner-color="white"
              />
            </template>
            <template v-else-if="column.name === 'likes'">
              <q-checkbox
                class="big-table__like-icon"
                v-model="likedRowIds"
                checked-icon="favorite"
                unchecked-icon="favorite_border"
                :val="row.id"
              />
            </template>
            <template v-else>
              {{ row[column.name] }}
            </template>
          </td>
        </tr>
      </TransitionGroup>
    </q-markup-table>
  </div>
</template>
<script>
const logoPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="

export default {
  name: 'BigTable',
  props: {
    coins: {
      type: Array,
      default: () => ([])
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      searchQuery: '',
      visibleColumns: ['current_price', 'name', 'atl', 'likes'],
      currentSort: {
        direction: null,
        column: null,
      },
      columns: [
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
          name: 'atl',
          label: 'ATL',
          format: (val) => val,
          field: (row) => row.atl,
          sortable: {
            handler: (a, b) => a.atl - b.atl,
          }
        },
        {
          name: 'likes',
          label: 'Like',
          format: (val) => val,
          field: (row) => '',
          sortable: {
            handler: (a, b) => {
              const hasLike = (this.likedRowIds || []).includes(a.id);
              return hasLike ? 1 : -1
            },
          }
        },
      ],
      logoPlaceholder,
      rows: [],
      likedRowIds: []
    }
  },
  computed: {
    notRequiredCols () {
      return this.columns.filter(col => !col.required)
    },
    filteredColumns () {
      return this.columns.filter(col => {
        if (col.required) return col;
        return this.visibleColumns.includes(col.name)
      })
    },
  },
  methods: {
    sort ({ column }) {
      if (!column.sortable) return;
      if (!this.currentSort.column || this.currentSort.column !== column.name) {
        this.currentSort.column = column.name;
        this.currentSort.direction = 'ad'
        this.rows = [...this.rows].sort(column.sortable.handler);
      } else if (this.currentSort.column === column.name) {
        if (this.currentSort.direction === 'ad') {
          this.currentSort.column = column.name;
          this.currentSort.direction = 'da'
          this.rows = [...this.rows].reverse();
        } else if (this.currentSort.direction === 'da') {
          this.currentSort.column = null;
          this.currentSort.direction = null;
          this.rows = [...this.coins];
        }
      }
    },
  },
  watch: {
    coins (val, oldVal) {
      if ((!oldVal || !oldVal.length) && val) {
        this.rows = val;
      }
    },
    searchQuery (val, oldVal) {
      this.rows = this.coins.filter(row => {
        return row.name.toLowerCase().includes(val.trim().toLowerCase())
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/big-table.scss';
</style>
