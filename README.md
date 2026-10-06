# noisebakery.com

## Develop

Use Node.js 22 and pnpm. `package.json` sets `packageManager` to pnpm.

Start the local site.

```bash
pnpm dev
```

Check types.

```bash
pnpm check
```

Build the static site. The build writes files to `dist`.

```bash
pnpm build
```

Cloudflare Pages uses the build command `pnpm build`, the output directory `dist`, and Node.js 22.
