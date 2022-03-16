export const bullbearSignal = {
    namespaced: true,
    state: () => ({
        fields: {
            'type-of-information': {
                type: 'select',
                label: 'Notification content',
                value: '',
                options: [
                    {
                        value: 'standard-signals',
                        label: 'Selected bullbear signals'
                    },
                    {
                        value: 'myportfolio',
                        label: 'Only my Portfolio'
                    },
                    {
                        value: 'portfolio-and-selected',
                        label: 'Bullbear signals + My Portfolio'
                    }
                ]
            },
            channel: {
                label: 'Preferred channel',
                type: 'select',
                value: '',
                options: [
                    {
                        value: '',
                        label: 'I\'ll keep it on the bullbear dashboard for now'
                    },
                    {
                        value: 'email',
                        label: 'E-mail'
                    },
                    {
                        value: 'discord',
                        label: 'Discord'
                    },
                    {
                        value: 'telegram',
                        label: 'Telegram'
                    },
                    {
                        value: 'twitter',
                        label: 'Twitter DM'
                    }
                ]
            },
            'communication-frequency': {
                type: 'select',
                label: 'Max frequency of the notifications',
                value: '',
                options: [
                    {
                        value: 'unfilled',
                        label: 'Select'
                    },
                    {
                        value: 'direct',
                        label: 'Instant (capped at 5/day)'
                    },
                    {
                        value: 'daily',
                        label: 'Daily'
                    },
                    {
                        value: 'weekly',
                        label: 'Weekly'
                    },
                    {
                        value: 'none',
                        label: 'Never'
                    }
                ]
            },
            username: {
                type: 'text',
                label: 'For Discord, Telegram or Twitter please fill in your username below (so we know where to find you)',
                value: null
            },
        }
    }),
    mutations: {
        UPDATE_FIELD_VALUE(state, {value, name}) {
            state.fields[name].value = value;
        },
        INIT_FIELDS_VALUES(state, {member}) {
            Object.keys(state.fields).forEach((fieldName) => {
                if (member[fieldName]) {
                    state.fields[fieldName].value = member[fieldName]
                }
            })
        }
    },
    actions: {},
    getters: {
        getFields (state) {
            return state.fields || {};
        }
    },
};
