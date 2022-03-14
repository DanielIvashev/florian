export default function auth({next, store}) {
    if (document.cookie.indexOf('__ms=') === -1) {
        return next({
            name: 'Login',
        });
    }
    return next();
}
