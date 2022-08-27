
import root from '__GENERATED__/root.svelte';
import { respond } from '../runtime/server/index.js';
import { set_paths, assets, base } from '../runtime/paths.js';
import { set_prerendering } from '../runtime/env.js';
import { set_private_env } from '../runtime/env-private.js';
import { set_public_env } from '../runtime/env-public.js';

const template = ({ head, body, assets, nonce }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\" />\n\n\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t<link rel=\"icon\" href=\"" + assets + "/favicon-light.png\" id=\"favicon\" />\n\t" + head + "\n\t<script>\n\t\tconst favicon = document.getElementById(\"favicon\");\n\t\tconst isDark = window.matchMedia(\"(prefers-color-scheme: dark)\");\n\n\t\tconst changeFavicon = () => {\n\t\t\tif (isDark.matches) favicon.href = \"" + assets + "/favicon-dark.png\";\n\t\t\telse favicon.href = \"" + assets + "/favicon-light.png\";\n\t\t};\n\n\t\tchangeFavicon();\n\n\t\tsetInterval(changeFavicon, 1000);\n\n\t</script>\n</head>\n\n\n<body class=\"bg-[#525252] dark:bg-[#1f1f1f] motion-safe:transition-colors motion-safe:duration-300\">\n\t<div>" + body + "</div>\n</body>\n\n</html>";

let read = null;

set_paths({"base":"","assets":""});

let default_protocol = 'https';

// allow paths to be globally overridden
// in svelte-kit preview and in prerendering
export function override(settings) {
	default_protocol = settings.protocol || default_protocol;
	set_paths(settings.paths);
	set_prerendering(settings.prerendering);
	read = settings.read;
}

export class Server {
	constructor(manifest) {
		this.options = {
			csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
			dev: false,
			get_stack: error => String(error), // for security
			handle_error: (error, event) => {
				this.options.hooks.handleError({
					error,
					event,

					// TODO remove for 1.0
					// @ts-expect-error
					get request() {
						throw new Error('request in handleError has been replaced with event. See https://github.com/sveltejs/kit/pull/3384 for details');
					}
				});
				error.stack = this.options.get_stack(error);
			},
			hooks: null,
			hydrate: true,
			manifest,
			method_override: {"parameter":"_method","allowed":[]},
			paths: { base, assets },
			prefix: assets + '/',
			prerender: {
				default: false,
				enabled: true
			},
			public_env: {},
			read,
			root,
			service_worker: null,
			router: true,
			template,
			template_contains_nonce: false,
			trailing_slash: "never"
		};
	}

	init({ env }) {
		const entries = Object.entries(env);

		const prv = Object.fromEntries(Object.entries(env).filter(([k]) => !k.startsWith('PUBLIC_')));

		const pub = Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith('PUBLIC_')));

		set_private_env(prv);
		set_public_env(pub);

		this.options.public_env = pub;
	}

	async respond(request, options = {}) {
		if (!(request instanceof Request)) {
			throw new Error('The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details');
		}

		if (!this.options.hooks) {
			const module = await import("./hooks.js");
			this.options.hooks = {
				getSession: module.getSession || (() => ({})),
				handle: module.handle || (({ event, resolve }) => resolve(event)),
				handleError: module.handleError || (({ error }) => console.error(error.stack)),
				externalFetch: module.externalFetch || fetch
			};
		}

		return respond(request, this.options, options);
	}
}
