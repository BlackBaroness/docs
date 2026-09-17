import { defineMiddleware } from 'astro:middleware';

const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
const legacyPrefix = `${base}/pages/baronessauth/`;

export const onRequest = defineMiddleware((context, next) => {
	const { pathname, search } = context.url;

	if (pathname.startsWith(legacyPrefix) && pathname.endsWith('.html')) {
		return context.rewrite(`${pathname}/${search}`);
	}

	return next();
});
