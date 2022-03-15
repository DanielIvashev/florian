import { Notify } from 'quasar';
import { store } from "@/store";

const notificationPresets = {
  error: {
    type: 'negative',
  },
  warning: {
    type: 'warning',
  },
  success: {
    type: 'positive',
  },
};

export function createNotification(options) {
  const { type, ...otherOptions } = options;
  return Notify.create({
    ...(notificationPresets[type] || {}),
    ...otherOptions,
  });
}

export function initMemberStack () {
    if (!window.MemberStack) {
        const elem = document.createElement( 'script' );
        elem.type = 'text/javascript';
        elem.setAttribute('data-memberstack-id', import.meta.env.VITE_DATA_MEMBERSTACK_ID)
        elem.async = true;
        document.body.appendChild( elem );
        elem.src = import.meta.env.VITE_MEMBERSTACK_API_URL;
        elem.onload = function (event) {
            if (window.MemberStack && window.MemberStack.onReady) {
                window.MemberStack.onReady.then(member => {
                    store.commit('SET_MEMBER_FROM_MEMBERSTACK', { member })
                    store.commit('bullbearSignal/INIT_FIELDS_VALUES', { member })
                })

            }
        }
    }
}

export function getCookie (name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
