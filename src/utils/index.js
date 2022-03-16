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

export function getCookie (name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function get(object, path, defaultValue) {
    let result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
}

export function getPropByPath (object, path) {
    const _path = Array.isArray(path)
        ? path
        : path.split('.');
    if (object && _path.length) return getPropByPath(object[_path.shift()], _path);
    return object;
}

export function advancedTypeof (field) {
    return Object.prototype.toString.call(field)
}
