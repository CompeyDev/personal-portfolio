import { c as create_ssr_component, e as escape, a as add_attribute, n as noop, b as safe_not_equal, d as subscribe, v as validate_component, f as each } from "../../_app/immutable/chunks/index-0da3af2d.js";
import { DateTime } from "luxon";
const Branch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { name = "" } = $$props;
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `${name ? `<span class="${"inline-block"}">on <span class="${"dark:text-ocean-magenta inline-block"}">\uE0A0 ${escape(name)}</span></span>` : ``}`;
});
let nodeVersion = "16.16.0";
const Language = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lang = "" } = $$props;
  let rustVersion = "1.62.1";
  fetch("https://api.github.com/repos/rust-lang/rust/releases/latest").then((res) => res.json()).then((res) => {
    rustVersion = res.tag_name ?? rustVersion;
  });
  let langMap;
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  langMap = {
    js: `<span class="dark:text-ocean-green"> \uE718 ${nodeVersion}</span>`,
    jsx: `<span class="dark:text-ocean-green"> \uE718 ${nodeVersion}</span>`,
    ts: `<span class="dark:text-ocean-green"> \uE718 ${nodeVersion}</span>`,
    tsx: `<span class="dark:text-ocean-green"> \uE718 ${nodeVersion}</span>`,
    svelte: `<span class="dark:text-ocean-green"> \uE718 ${nodeVersion}</span>`,
    rust: `<span class="dark:text-ocean-rust"> \u{1F980} v${rustVersion}</span>`
  };
  return `${langMap[lang] ? `<span class="${"inline-block"}">via <!-- HTML_TAG_START -->${langMap[lang]}<!-- HTML_TAG_END --></span>` : ``}`;
});
const ProjectItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { name } = $$props;
  let { description = void 0 } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  return `<li><a${add_attribute("href", href, 0)} target="${"_blank"}" rel="${"noreferrer noopener"}" class="${"dark:text-ocean-300 underline"}">${escape(name)}</a>
	${description ? `<span class="${"dark:text-ocean-400"}">- ${escape(description)}</span>` : ``}</li>`;
});
const Workspace = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { workspace = "" } = $$props;
  if ($$props.workspace === void 0 && $$bindings.workspace && workspace !== void 0)
    $$bindings.workspace(workspace);
  return `${workspace ? `<span class="${"inline-block"}">in <span class="${"dark:text-ocean-100"}">${escape(workspace)}</span></span>` : ``}`;
});
const getCodeData = (data) => {
  var _a;
  const codeActivity = data == null ? void 0 : data.activities.find((a2) => a2.application_id === "782685898163617802");
  if (!codeActivity) {
    return void 0;
  }
  const idling = codeActivity.details === "Idling";
  if (idling) {
    return {
      idling: true
    };
  }
  const workspace = codeActivity.details.substring(3).split(" - ")[0];
  const branch = codeActivity.details.substring(3).replaceAll(/\u200b/g, "").trim().split(" - ")[1];
  const lang = (_a = codeActivity.assets.large_text) == null ? void 0 : _a.split(" ")[2].toLocaleLowerCase();
  return {
    lang,
    workspace,
    branch
  };
};
const getOtherActivities = (data) => {
  const otherActivities = data == null ? void 0 : data.activities.filter((a2) => a2.application_id !== "782685898163617802" && a2.type === 0);
  return otherActivities == null ? void 0 : otherActivities.map((activity) => ({ name: activity.name, start: activity.timestamps ? new Date(activity.timestamps.start) : void 0 }));
};
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var n = {};
(() => {
  n.d = (e, t2) => {
    for (var r2 in t2) {
      if (n.o(t2, r2) && !n.o(e, r2)) {
        Object.defineProperty(e, r2, { enumerable: true, get: t2[r2] });
      }
    }
  };
})();
(() => {
  n.o = (e, n2) => Object.prototype.hasOwnProperty.call(e, n2);
})();
if (typeof n !== "undefined")
  n.ab = new URL(".", import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
var t = {};
n.d(t, { D: () => s, q: () => useLanyard });
var x = (e) => {
  var t2 = {};
  n.d(t2, e);
  return t2;
};
const r = x({ ["readable"]: () => readable });
var s;
(function(e) {
  e[e["EVENT"] = 0] = "EVENT";
  e[e["HELLO"] = 1] = "HELLO";
  e[e["INITIALIZE"] = 2] = "INITIALIZE";
  e[e["HEARTBEAT"] = 3] = "HEARTBEAT";
})(s || (s = {}));
const a = "https://api.lanyard.rest/v1";
const o = "wss://api.lanyard.rest/socket";
function useLanyard(e) {
  if (e.method === "rest") {
    const n2 = (0, r.readable)(void 0, (n3) => {
      lanyardRest(e, n3);
    });
    return n2;
  }
  if (e.method === "ws") {
    if ("id" in e) {
      const n3 = (0, r.readable)(void 0, (n4) => {
        lanyardWS(e, n4);
      });
      return n3;
    }
    const n2 = (0, r.readable)(void 0, (n3) => {
      lanyardWS(e, n3);
    });
    return n2;
  }
}
async function lanyardRest(e, n2) {
  if (typeof window === "undefined") {
    return;
  }
  const t2 = e.restUrl ?? a;
  const lanyardFetch = async () => await fetch(`${t2}/users/${e.id}`).then((e2) => e2.json());
  const updateStore = async () => {
    const e2 = await lanyardFetch();
    if (e2.success) {
      n2(e2.data);
    } else {
      throw new Error(e2.error.message);
    }
  };
  updateStore();
  setInterval(updateStore, e.pollInterval ?? 5e3);
}
async function lanyardWS(e, n2) {
  if (typeof window === "undefined") {
    return;
  }
  const t2 = e.wsUrl ?? o;
  const r2 = new WebSocket(t2);
  const send = (e2) => r2.send(JSON.stringify(e2));
  const recv = (e2) => {
    r2.addEventListener("message", e2);
  };
  const once = () => new Promise((e2) => {
    const fn = (n3) => {
      r2.removeEventListener("message", fn);
      e2(JSON.parse(n3.data));
    };
    r2.addEventListener("message", fn);
  });
  const waitInit = () => new Promise((e2, n3) => {
    const open = () => {
      r2.removeEventListener("open", open);
      e2();
    };
    r2.addEventListener("open", open);
    const err = () => {
      r2.removeEventListener("error", err);
      n3();
    };
    r2.addEventListener("error", err);
  });
  await waitInit();
  if ("all" in e) {
    send({ op: s.INITIALIZE, d: { subscribe_to_all: true } });
  }
  if ("ids" in e) {
    send({ op: s.INITIALIZE, d: { subscribe_to_ids: e.ids } });
  }
  if ("id" in e) {
    send({ op: s.INITIALIZE, d: { subscribe_to_id: e.id } });
  }
  const a2 = await once();
  const d = a2.d.heartbeat_interval;
  const heartbeat = () => {
    send({ op: s.HEARTBEAT, d: void 0 });
  };
  setInterval(heartbeat, d);
  const i2 = await once();
  const c = i2.d;
  n2(c);
  recv((e2) => {
    const t3 = JSON.parse(e2.data);
    if ("user_id" in t3.d) {
      const { user_id: e3, ...r3 } = t3.d;
      c[t3.d.user_id] = r3;
      n2(c);
    } else {
      n2({ ...t3.d });
    }
  });
}
t.D;
var i = t.q;
const prerender = true;
const timeZone = "America/New_York";
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  var _a, _b, _c;
  let timeFormatter;
  let dateFormatter;
  let date;
  let time;
  let codeData;
  let otherActivities;
  let $data, $$unsubscribe_data;
  const isTimeZoneSame = Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;
  let now = new Date();
  setInterval(
    () => {
      now = new Date();
    },
    100
  );
  const data = i({ method: "ws", id: "893762371770802227" });
  $$unsubscribe_data = subscribe(data, (value) => $data = value);
  timeFormatter = new Intl.DateTimeFormat(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: void 0
    }
  );
  dateFormatter = new Intl.DateTimeFormat(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZoneName: "short",
      timeZone: void 0
    }
  );
  date = dateFormatter.format(now);
  time = timeFormatter.format(now);
  codeData = getCodeData($data);
  otherActivities = getOtherActivities($data);
  $$unsubscribe_data();
  return `${$$result.head += `${$$result.title = `<title>silly little portfolio</title>`, ""}<meta name="${"og:title"}" content="${"portfolio"}" data-svelte="svelte-1m4vk2j"><meta name="${"description"}" content="${"a collection of various things"}" data-svelte="svelte-1m4vk2j"><meta name="${"og:description"}" content="${"a collection of various things"}" data-svelte="svelte-1m4vk2j"><meta name="${"theme-color"}" media="${"(prefers-color-scheme: light)"}" content="${"#f9f0f5"}" data-svelte="svelte-1m4vk2j"><meta name="${"theme-color"}" media="${"(prefers-color-scheme: dark)"}" content="${"#281c21"}" data-svelte="svelte-1m4vk2j">`, ""}

<section class="${"p-8 sm:p-12 lg:p-24 lg:py-16 font-cascadia z-10 flex flex-col sm:flex-row gap-y-10 justify-center grid place-items-center h-screen"}"><div class="${"flex flex-col gap-7"}"><div class="${"min-h-[3em] lg:min-h-0"}"><h1 class="${"text-ocean-700 dark:text-ocean-300"}"><span class="${"dark:text-ocean-blue"}">compey</span>
				${validate_component(Workspace, "Workspace").$$render($$result, { workspace: codeData == null ? void 0 : codeData.workspace }, {}, {})}
				${validate_component(Branch, "Branch").$$render($$result, { name: codeData == null ? void 0 : codeData.branch }, {}, {})}
				${validate_component(Language, "Language").$$render($$result, { lang: codeData == null ? void 0 : codeData.lang }, {}, {})}</h1></div>
		<div><h1 class="${"text-ocean-900 dark:text-ocean-100"}">projects</h1>
			<ul class="${"list-disc list-inside text-ocean-700 dark:text-ocean-blue"}">${validate_component(ProjectItem, "ProjectItem").$$render(
    $$result,
    {
      href: "https://datalink.dev",
      name: "datalink",
      description: "lightweight & futuristic analytics platform"
    },
    {},
    {}
  )}
				${validate_component(ProjectItem, "ProjectItem").$$render(
    $$result,
    {
      href: "https://github.com/flightpkg",
      name: "flightpkg",
      description: "package manager of the future"
    },
    {},
    {}
  )}
				${validate_component(ProjectItem, "ProjectItem").$$render(
    $$result,
    {
      href: "https://github.com/CompeyDev/bvm",
      name: "bvm",
      description: "bun version manager"
    },
    {},
    {}
  )}
				${validate_component(ProjectItem, "ProjectItem").$$render(
    $$result,
    {
      href: "https://github.com/CompeyDev/discord-status-action",
      name: "discord-status-action",
      description: "discord status emoji using GitHub Actions"
    },
    {},
    {}
  )}</ul></div>

		<div><h1 class="${"text-ocean-900 dark:text-ocean-100"}">links</h1>
			<ul class="${"list-disc list-inside text-ocean-700 dark:text-ocean-blue"}">${validate_component(ProjectItem, "ProjectItem").$$render(
    $$result,
    {
      href: "https://twitter.com/DevComp_",
      name: "twitter"
    },
    {},
    {}
  )}
				${validate_component(ProjectItem, "ProjectItem").$$render(
    $$result,
    {
      href: "https://github.com/CompeyDev",
      name: "github"
    },
    {},
    {}
  )}
				${validate_component(ProjectItem, "ProjectItem").$$render(
    $$result,
    {
      href: "mailto:hi@devcomp.xyz",
      name: "email"
    },
    {},
    {}
  )}</ul></div>
	<div class="${"text-ocean-900 dark:text-ocean-300 flex flex-col items-start sm:items-end gap-3 sm:gap-7 sm:text-right"}">${!isTimeZoneSame ? `<div class="${"flex flex-col items-start sm:items-end hover:underline cursor-pointer"}"><span>${escape(date)}</span>
				<span>${escape(time)}</span></div>` : `<div class="${"flex flex-col items-start sm:items-end"}"><span>${escape(date)}</span>
				<span>${escape(time)}</span></div>`}
		${($data == null ? void 0 : $data.spotify) ? `<div class="${"flex flex-col items-start sm:items-end"}"><span class="${"text-ocean-900 dark:text-ocean-100"}">${escape((_a = $data.spotify) == null ? void 0 : _a.song)}</span>
				<span class="${"text-ocean-800 dark:text-ocean-300"}">${escape((_b = $data.spotify) == null ? void 0 : _b.artist)}</span>
				<span class="${"text-ocean-700 dark:text-ocean-400"}">${escape((_c = $data.spotify) == null ? void 0 : _c.album)}</span></div>` : ``}
		${(codeData == null ? void 0 : codeData.idling) ? `<div class="${"flex flex-col items-start sm:items-end"}"><span class="${"text-ocean-900 dark:text-ocean-100"}">vsc</span>
				<span class="${"text-ocean-700 dark:text-ocean-400"}">currently idling </span></div>` : ``}
		${codeData && !codeData.idling ? `<div class="${"flex flex-col items-start sm:items-end"}"><span class="${"text-ocean-900 dark:text-ocean-100"}">vsc</span>
				<span class="${"text-ocean-800 dark:text-ocean-300"}">${escape(codeData.workspace)}${escape(codeData.branch ? `/${codeData.branch}` : "")}</span>
				<span class="${"text-ocean-700 dark:text-ocean-400"}">currently writing
					<span class="${"text-ocean-700 dark:text-ocean-200"}">${escape(codeData.lang)}</span></span></div>` : ``}
		${otherActivities ? `${each(otherActivities, (activity) => {
    var _a2;
    return `<div class="${"flex flex-col items-start sm:items-end"}"><span class="${"text-ocean-700 dark:text-ocean-400"}">playing <span class="${"text-ocean-700 dark:text-ocean-200"}">${escape(activity.name)}</span>
						${activity.start ? `for ${escape((_a2 = DateTime.fromJSDate(activity.start).toRelative({ base: DateTime.fromJSDate(now) })) == null ? void 0 : _a2.replace(" ago", ""))}` : ``}</span>
				</div>`;
  })}` : ``}</div></div></section>`;
});
export {
  Routes as default,
  prerender
};
