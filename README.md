# @font44/opencode-conf

Shared [OpenCode](https://opencode.ai) configuration: the `slim-tools` plugin,
agent prompt overrides (`build`, `plan`, `general`), and skills
(`fetch-website-in-markdown`, `flashcard-content-creator`).

## What's inside

- `plugins/slim-tools.ts` — truncates any tool description longer than 250
  characters before it's sent to the model. Reduces prompt bloat.
- `agents/` — prompt overrides for `build`, `plan`, and `general` agents.
- `skills/` — skill definitions.
- `AGENTS.md` — global instructions.
- `opencode.jsonc` — reference config wiring everything together and disabling
  the built-in `explore` and `general` agents.

## Install

As an npm dependency:

```bash
bun add -d @font44/opencode-conf
# or: npm i -D @font44/opencode-conf
```

Then in your project's `opencode.jsonc`:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@font44/opencode-conf/slim-tools"]
}
```

### Agents, skills, AGENTS.md

These are filesystem assets that OpenCode loads from your config dir. Copy or
symlink them from `node_modules/@font44/opencode-conf/` into your OpenCode
config (e.g. `~/.config/opencode/` or per-project). Example:

```bash
cp -r node_modules/@font44/opencode-conf/{agents,skills,AGENTS.md} .
```

Or just clone this repo and point OpenCode at it directly — the included
`opencode.jsonc` uses the relative path `./plugins/slim-tools.ts`.

## Develop

```bash
bun install
bun test          # unit tests + asset sanity checks
bun run typecheck
```

### Manual smoke test

In a scratch project:

```jsonc
// opencode.jsonc
{ "plugin": ["file:/abs/path/to/opencode-conf"] }
```

Run `opencode`, trigger a tool call, and confirm long tool descriptions get
truncated to 250 chars + `...`.

## License

MIT
