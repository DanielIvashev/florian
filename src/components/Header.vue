<template>
    <q-header reveal elevated class="header">
        <q-toolbar>
            <q-btn flat @click="$store.commit('navigation/CHANGE_DRAWER_OPEN', { value: !drawerState.open })" round dense icon="menu" class="header__menu-toggle-btn" />
            <q-toolbar-title class="header__toolbar-title">
                <div class="header__logo-wrapper">
                    <q-img
                        class="header__logo"
                        src="/src/assets/images/bullbear-logo.png"
                        alt="footer logo"
                        :logo-placeholder="logoPlaceholder"
                        spinner-color="white"
                    />
                </div>
                <q-space />
                <div class="header__navigation-links">
                    <a href="/#/ms/profile" class="header__navigation-link">My Profile</a>
                    <router-link :to="{ name: 'BullbearSignal' }" class="header__navigation-link">Bullbear Signal</router-link>
                    <a href="/#/ms/logout" class="header__navigation-link" @click="logout">logout</a>
                </div>
            </q-toolbar-title>
        </q-toolbar>
    </q-header>
</template>

<script>
const logoPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="

export default {
    name: 'Header',
    data() {
        return {
            logoPlaceholder,
        }
    },
    computed: {
        drawerState () {
            return this.$store.getters['navigation/getDrawerState'];
        }
    },
    methods: {
        logout () {
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/header";
</style>
