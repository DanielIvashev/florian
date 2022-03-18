<template>
    <div v-if="!$route.name">
        <q-inner-loading showing>
            <q-spinner-gears
                size="50px"
                color="primary"
            />
        </q-inner-loading>
    </div>
    <component
        :is="layout"
        v-else
    />
</template>
<script>
import MainLayout from '@/layouts/MainLayout.vue';
import GuestsLayout from '@/layouts/GuestsLayout.vue';

export default {
    name: 'App',
    components: {
        MainLayout,
        GuestsLayout
    },
    data () {
        return {};
    },
    computed: {
        layout () {
            return this.$route.meta.layout || 'main-layout';
        }
    },
    mounted () {
        this.$store.dispatch('initialize');
    },
    watch: {
    },
    methods: {}
};

</script>
