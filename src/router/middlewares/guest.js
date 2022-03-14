export default function guest({next, store}) {
    if (document.cookie.indexOf('__ms=') !== -1) {
        return next({
            name: 'Dashboard',
        });
    }

    return next();
}
