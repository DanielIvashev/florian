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
                    <h4 class="login__title">Login</h4>
                    <q-form
                        class="q-gutter-md"
                        data-ms-form="login"
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
                        <div>
                            <q-btn label="Submit" type="submit" color="primary" />
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
                            <q-btn label="password reset" href="/#/ms/password-reset" color="primary" flat class="q-ml-sm"/>
                        </div>
                    </q-form>
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
