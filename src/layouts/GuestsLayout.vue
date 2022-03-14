<template>
    <q-layout view="hHh lpR fFf">
        <q-page-container>
            <q-page padding>
                <router-view v-slot="{ Component }">
                    <transition name="router" mode="out-in">
                        <component :is="Component"/>
                    </transition>
                </router-view>
            </q-page>
        </q-page-container>
    </q-layout>
</template>
<script>

import {initMemberStack} from "@/utils";

export default {
    name: 'Guests layout',
    mounted() {
        initMemberStack()
    }
}
</script>
