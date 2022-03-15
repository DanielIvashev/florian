import {getCookie} from "@/utils";

export default function guest({next, store}) {
    if (getCookie('__ms')) {
        return next({
            name: 'Dashboard',
        });
    }

    return next();
}
