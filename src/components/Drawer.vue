<template>
    <div class="drawer">
        <q-drawer
            v-model="open"
            :width="300"
            bordered
            overlay
            class="bg-grey-3"
        >
            <q-scroll-area class="fit">
                <q-list>
                    <q-item clickable v-ripple tag="a">
                        <q-item-section>
                            My Profile
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple tag="a">
                        <q-item-section>
                            Bullbear Signal
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple tag="a">
                        <q-item-section>
                            Logout
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-scroll-area>
        </q-drawer>
    </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
    getterType: 'navigation/getField',
    mutationType: 'navigation/updateField',
});
export default {
    name: 'Drawer',
    computed: {
        ...mapFields(['drawer.open'])
    },
    watch: {
        drawer(val) {
            console.log(val)
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/drawer";
</style>
