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
        <form ms-update="profile" style="display: none" v-once>
            <input type="text" ms-field="liked-coins" hidden aria-hidden="true" id="likedCoinsInput">
        </form>
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
    mounted () {
        window.MemberStack.reload();
    },
};
</script>
