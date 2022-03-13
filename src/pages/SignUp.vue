<template>
    <div class="sign-up">
        <div class="sign-up__wrapper">
            <q-card class="sign-up__form-card">
                <q-card-section>
                    <div class="sign-up__logo-wrapper">
                        <q-img
                            class="sign-up__logo"
                            src="/src/assets/images/bullbear-logo.png"
                            spinner-color="white"
                        />
                    </div>
                    <h4 class="sign-up__title">{{ $t('messages.signUp') }}</h4>
                    <q-form
                        class="q-gutter-md"
                        @submit="signUp"
                    >
                        <q-input
                            filled
                            v-model="name"
                            label="Your name *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                            filled
                            v-model="email"
                            label="Your email *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                            filled
                            v-model="password"
                            label="Your password *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <div>
                            <q-btn label="Submit" type="submit" color="primary"/>
                            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
        </div>
    </div>
</template>

<script>
import { createHelpers } from 'vuex-map-fields';

const {mapFields} = createHelpers({
    getterType: 'auth/getField',
    mutationType: 'auth/updateField',
});
export default {
    name: 'SignUp',
    computed: {
        ...mapFields(['signUpForm.email', 'signUpForm.password', 'signUpForm.name'])
    },
    methods: {
        signUp () {
            this.$store.dispatch('auth/login');
        }
    }
}
</script>
<style lang='scss' scoped>
@import '@/styles/sign-up';
</style>
