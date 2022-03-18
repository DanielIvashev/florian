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
                    <h4 class="sign-up__title">Create an account</h4>
                    <q-form
                        class="q-gutter-md"
                        data-ms-form="signup"
                        @submit.prevent="() => {}"
                    >
                        <q-input
                            filled
                            data-ms-member="name"
                            v-model="name"
                            label="Your name *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                            filled
                            v-model="email"
                            data-ms-member="email"
                            label="Your email *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <q-input
                            filled
                            v-model="password"
                            type="password"
                            data-ms-member="password"
                            label="Your password *"
                            lazy-rules
                            :rules="[ val => val && val.length > 0 || 'Please type something']"
                        />
                        <div>
                            <q-btn label="Submit" type="submit" color="primary" style="width: 100%"/>
                        </div>
                    </q-form>
                </q-card-section>
            </q-card>
            <q-card class="sign-up__have-account-card">
                <q-card-section>
                    <b class="sign-up__have-account-text">
                        Already a member?
                        <router-link :to="{ name: 'Login' }" class="sign-up__have-account-link">
                            Log in here
                        </router-link>
                    </b>
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
    },
    mounted () {
        if (window.MemberStack) {
            window.MemberStack.reload();
        }
    },
}
</script>
<style lang='scss' scoped>
@import '@/styles/sign-up';
</style>
