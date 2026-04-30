# opencode-conf

Personal [OpenCode](https://opencode.ai) configuration: slim-tools plugin,
agent prompt overrides, skills, AGENTS.md.

## Install

Clone, then point opencode at the directory via `OPENCODE_CONFIG_DIR`:

```bash
git clone git@github.com:font44/opencode-conf.git ~/code/opencode-conf
# in ~/.zshrc (or equivalent):
export OPENCODE_CONFIG_DIR="$HOME/code/opencode-conf"
```

OpenCode auto-loads `agents/`, `skills/`, `AGENTS.md`, `opencode.jsonc`, and
`plugins/*.ts` from the directory, and backgrounds `bun install` on first
launch.

## Contents

- `plugins/slim-tools.ts` — truncates tool descriptions > 250 chars.
- `agents/` — prompt overrides for `build`, `plan`, `general`.
- `skills/` — skill definitions.
- `AGENTS.md` — global instructions.
- `opencode.jsonc` — config stub.

## Develop

```bash
npm install
npm run typecheck
```
