# AGENTS.md — FLASH BOT (Rin-Itoshi-Bot fork)

## What this is
A WhatsApp multi-device bot, forked from `Hoshinari/Rin-Itoshi-Bot` into
`dwhhhg8-code/Rin-Itoshi-Bot`. The interface, messages, and menus are in Arabic.
Branding belongs to **FLASH BOT / haitham** (transferred from `dwhhhg8-code/flash-bot`).

## Run
```bash
npm install
node index.js qr        # prints a QR to link
node index.js           # menu to choose QR or 8-digit pairing code
```
`npm start` == `node index.js`.

## Layout
- `index.js` — entrypoint; loads plugins, connects Baileys, prints QR.
- `settings.js` — global branding/owner/config. **Edit branding here.**
- `handler.js` — message pipeline, chat defaults, per-plugin dispatch.
- `lib/` — helpers (`plugins.js` = plugin loader, `simple.js`, `print.js`, `gdrive.js`).
- `plugins/` — ~435 command files. Loaded by `index.js` via
  `global.__dirname(join(__dirname, './plugins/index'))`.
- `src/` — `catalogo.jpg` thumbnail + `database/`.

## Critical gotcha: `global.__dirname`
`global.__dirname(p)` strips the **last** path segment. So
`join(__dirname,'./plugins/index')` → `<root>/plugins` (the real folder) and
`'../plugins/index'` from `lib/` → `<root>/plugins`. Do **not** "fix" these to
`'./plugins'` — that resolves to `<root>` and zero plugins load. The `index`
suffix is intentional.

## Baileys dependency
`package.json` pins `baileys` to `github:dwhhhg8-code/bails` (a compatibility
library replacing the deleted `github:AkiraDevX/bails`). Do not point it back at
AkiraDevX.

## Editing rules learned the hard way
1. **Never do a blind global find/replace on Spanish words.** `error`, `menu`,
   `admin`, `solo`, `link`, `total`, `hoy`, `no` collide with identifiers,
   `console.error`, `new Error`, and object keys. It breaks the code silently.
2. Translate **only inside string literals**. The safe path is an AST pass
   (`acorn`, already in `node_modules`) that rewrites `Literal`/template-quasi
   values while skipping object keys, `import`/`export` sources, member
   properties, and `handler.command` / `handler.tags` arrays.
3. Command names must stay Latin — verify with
   `grep -h "handler.command" plugins/*.js | grep -P '[\x{0600}-\x{06FF}]'`
   (must be empty).
4. Always finish with `node --check` on every changed file, then a real run:
   `timeout 45 node index.js qr` and confirm `grep -ci error` == 0.

## Content policy
NSFW/18+ plugins were removed (40 files: `nsfw-*`, `buscador-pornhub|xvideos|xnxx|hentai`,
`descargas-xnxx|xvideos`, `dl-hentai`, `fun-loli`, `fun-paja`, `fun-piropo`,
`menu-nsfw`) plus every menu/setting reference and the explicit audio triggers in
`plugins/_audios.js`. Keep it that way.

## Verification checklist
```bash
for f in $(find . -name '*.js' -not -path './node_modules/*'); do node --check "$f"; done
grep -rliE 'nsfw|hentai|pornhub|xnxx|xvideos|rule34|🔞' --include='*.js' plugins/ handler.js   # empty
timeout 45 node index.js qr 2>&1 | grep -ci error                                               # 0
```

## Branding source of truth (from flash-bot)
- Name: `𓆩⚡𓆪 𝙁𝙇𝘼𝙎𝙃 𝘽𝙊𝙏 𓆩⚡𓆪` / `FLASH BOT`
- Owner: `201125166486` (`ⲂＹ 𝖍𝖆𝖎𝖙𝖍𝖆𝖒 👑`)
- Channel: `https://whatsapp.com/channel/0029Vb8QIpSJ3juu0VHRyU0v`
- Group: `https://chat.whatsapp.com/JyzcMffpXp2DrvOB4Z2jz9?mode=gi_t`
- GitHub: `https://github.com/dwhhhg8-code/flash-bot`
- Email: `dwhhhg8@gmail.com`

## Note on API keys
`apikey=Shadow_Core` / `Shadow-nex` inside `stellarwa.xyz` URLs are third-party
service keys, not branding — leave them alone.
