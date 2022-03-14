<template>
    <q-layout view="hHh LpR fff">
        <custom-header />
        <custom-drawer />
        <q-page-container>
            <q-page padding>
                <router-view v-slot="{ Component }">
                    <transition name="router" mode="out-in">
                        <component :is="Component"/>
                    </transition>
                </router-view>
            </q-page>
        </q-page-container>
        <custom-footer />
    </q-layout>
</template>

<script>

import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import Drawer from '@/components/Drawer.vue';

export default {
    name: 'MainLayout',
    components: {
        CustomFooter: Footer,
        CustomHeader: Header,
        CustomDrawer: Drawer
    },
    data() {
        return {};
    },
    mounted() {
    }
};
</script>
