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

export const filterBy = (prop, value) => rows =>
    value === ''
        ? rows
        : rows.filter(row => (row[prop] + '').toLowerCase().includes(value.trim().toLowerCase()))
