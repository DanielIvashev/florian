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

export function getCookie (name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
