<template>
    <div class="login">
        <div class="login__wrapper">
            <q-card class="login__form-card">
                <q-card-section>
                    <div class="login__logo-wrapper">
                        <q-img
                            class="login__logo"
                            src="/src/assets/images/bullbear-logo.png"
                            spinner-color="white"
                        />
                    </div>
                    <h4 class="login__title">Welcome back</h4>
                    <q-form
                        class="q-gutter-md"
                        data-ms-form="login"
                        @submit.prevent="() => {}"
                    >
                        <q-input
                            filled
                            v-model="email"
                            data-ms-member="email"
                            label="Your email *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                            type="password"
                            filled
                            v-model="password"
                            data-ms-member="password"
                            label="Your password *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <div style="display: flex; justify-content: flex-end; font-weight: 700">
                            <q-btn
                                label="Reset my password"
                                href="/#/ms/password-reset"
                                color="primary"
                                style="font-weight: 700; text-transform: none"
                                flat class="q-ml-sm"
                            />
                        </div>
                        <div>
                            <q-btn label="Submit" type="submit" color="primary" style="width: 100%"/>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
            <q-card class="login__dont-have-account-card">
                <q-card-section>
                    <b class="login__dont-have-account-text">
                        Need an account?
                        <router-link :to="{ name: 'SignUp' }" class="login__dont-have-account-link">
                            Sign up here
                        </router-link>
                    </b>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';

const { mapFields } = createHelpers({
    getterType: 'auth/getField',
    mutationType: 'auth/updateField',
});

export default {
    name: 'Login',
    computed: {
        ...mapFields(['loginForm.email', 'loginForm.password']),
    }
}
</script>
<style lang='scss' scoped>
@import '@/styles/login';
</style>
