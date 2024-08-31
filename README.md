# Portfolio Website

My current portfolio website, [https://ab-web.dev](https://ab-web.dev) which was built using [petite-vue](https://github.com/vuejs/petite-vue), a tiny version of Vue.js which only ships with the basic reactivity fundamentals. This is used to load and display the content on the page.

## Features

- Petite-vue for client-side templating and loading
- Cloudflare D1 for some content loading
- Cloudflare R2 for static file hosting
- Cloudflare Workers for basic routing
- Hosted on Cloudflare Pages
- Deployed and Developed using Wrangler
- PicoCSS for base styling
- AoS.css for animations

All-in-all, this equates to around a 700kb payload (transferred) for the entire site, including images. Once caching kicks in, subsequent page visits should see about a 9-10kb transfer size.

## License

Apache License, Version 2.0. See `LICENSE.md`
