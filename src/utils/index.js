import { Notify } from 'quasar';

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
    }
}
