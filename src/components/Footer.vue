<template>
    <q-footer elevated class="footer">
        <div class="footer__logo-wrapper">
            <q-img
                class="footer__logo"
                src="/src/assets/images/bullbear-logo-white.png"
                alt="footer logo"
                :logo-placeholder="logoPlaceholder"
                spinner-color="white"
            />
        </div>
        <div class="footer__text">
            <span>Copyright 2022 . All Rights Reserved. From Amsterdam with love 💚</span>
        </div>
    </q-footer>
</template>

<script>

const logoPlaceholder = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
export default {
    name: 'Footer',
    data() {
        return {
            logoPlaceholder,
        }
    },
}
</script>

<style scoped lang="scss">
@import "@/styles/footer";
</style>
