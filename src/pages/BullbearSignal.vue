<template>
    <div class="bullbear-signal">
        <q-btn label="Back to Dashboard" type="button" color="primary" @click="$router.push({ name: 'Dashboard' })"/>
        <q-card class="bullbear-signal__form-card">
            <q-card-section>
                <div class="bullbear-signal__logo-wrapper">
                    <q-img
                        class="bullbear-signal__logo"
                        src="/src/assets/images/bullbear-icon.png"
                        spinner-color="white"
                    />
                </div>
                <h4 class="bullbear-signal__title">What are your bullbear signals preferences:</h4>
                <q-form
                    class="q-gutter-md"
                    @submit.prevent="() => {}"
                    ms-update="profile"
                >
                    <div v-for="(field, fieldName) in getFields" :key="fieldName">
                        <input :type="field.type" :value="field.value" :ms-field="fieldName" hidden aria-hidden="true">
                        <label :for="fieldName" class="bullbear-signal__label">{{ field.label }}</label>
                        <template v-if="field.type === 'select'">
                            <q-select
                                emit-value
                                map-options
                                filled
                                :id="fieldName"
                                :model-value="field.value"
                                @update:model-value="event => updateFieldValue({ value: event, name: fieldName })"
                                :options="field.options"
                                transition-show="jump-up"
                                transition-hide="jump-down"
                            />
                        </template>
                        <template v-else-if="field.type === 'text'">
                            <q-input
                                filled
                                :id="fieldName"
                                :model-value="field.value"
                                @update:model-value="event => updateFieldValue({ value: event, name: fieldName })"
                            />
                        </template>
                    </div>
                    <div>
                        <a
                            href="https://discord.gg/HvXT6CdRWR"
                            target="_blank"
                            class="bullbear-signal__discord-link"
                        >
                            Also, for Discord: connect to our Server
                        </a>
                        <q-btn
                            class="bullbear-signal__submit-btn"
                            label="That looks about right"
                            type="submit"
                            color="primary"
                        />
                    </div>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    name: 'BullbearSignal',
    computed: {
        getFields () {
            return this.$store.getters['bullbearSignal/getFields']
        },
        getMemberFromMemberStack () {
            return this.$store.getters['getMemberFromMemberstack'] || {};
        }
    },
    methods: {
        updateFieldValue({value, name}) {
            this.$store.commit('bullbearSignal/UPDATE_FIELD_VALUE', {value, name})
        }
    },
    watch: {
        getMemberFromMemberStack (val, oldVal) {
            if (Object.keys(val) !== Object.keys(oldVal)) {
                this.$store.commit('bullbearSignal/INIT_FIELDS_VALUES', { member: val })
            }
        }
    },
    mounted() {
        if (window.MemberStack) {
            window.MemberStack.reload();
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/styles/bullbear-signal';
</style>
