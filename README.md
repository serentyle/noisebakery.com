# noisebakery.com

## Develop

Use Node.js 22.

Start the local site.

```bash
npm run dev
```

Check types.

```bash
npx astro check
```

Build the static site. The build writes files to `dist`.

```bash
npm run build
```

Cloudflare Pages uses the build command `npm run build`, the output directory `dist`, and Node.js 22.
