<template>
  <div class="dashboard">
    <div class="dashboard__content">
      <h1 class="dashboard__title">
        Dashboard
      </h1>
      <big-table :coins="getCoinsGecko" :loading="getCoinsGeckoLoading" />
    </div>
  </div>
</template>

<script>
import BigTable from "@/components/BigTable.vue";
export default {
  name: 'Dashboard',
  components: {
    BigTable
  },
  computed: {
    getCoinsGecko () {
      return this.$store.getters['getCoinsGecko'];
    },
    getCoinsGeckoLoading () {
      return this.$store.getters['getCoinsGeckoLoading'];
    },
    getCoinsGeckoError () {
      return this.$store.getters['getCoinsGeckoError'];
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/dashboard.scss';
</style>
