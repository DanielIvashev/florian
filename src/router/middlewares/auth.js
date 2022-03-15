import {getCookie} from "@/utils";

export default function auth({next, store}) {
    if (!getCookie('__ms')) {
        return next({
            name: 'Login',
        });
    }
    return next();
}
