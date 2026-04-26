import { describe, test, expect } from "bun:test";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dir, "..");

function parseFrontmatter(content: string): Record<string, string> | null {
  if (!content.startsWith("---\n")) return null;
  const end = content.indexOf("\n---", 4);
  if (end === -1) return null;
  const body = content.slice(4, end);
  const out: Record<string, string> = {};
  for (const line of body.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim();
  }
  return out;
}

describe("agents", () => {
  const dir = join(ROOT, "agents");
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));

  test("at least build, plan, general exist", () => {
    expect(files.sort()).toEqual(["build.md", "general.md", "plan.md"]);
  });

  for (const f of files) {
    test(`${f} has valid frontmatter with mode`, () => {
      const fm = parseFrontmatter(readFileSync(join(dir, f), "utf8"));
      expect(fm).not.toBeNull();
      expect(["primary", "subagent"]).toContain(fm!.mode);
    });
  }
});

describe("skills", () => {
  const dir = join(ROOT, "skills");
  const skills = readdirSync(dir).filter((d) => statSync(join(dir, d)).isDirectory());

  test("expected skills are present", () => {
    expect(skills.sort()).toEqual([
      "fetch-website-in-markdown",
      "flashcard-content-creator",
    ]);
  });

  for (const s of skills) {
    test(`${s}/SKILL.md exists with name + description frontmatter`, () => {
      const path = join(dir, s, "SKILL.md");
      expect(existsSync(path)).toBe(true);
      const fm = parseFrontmatter(readFileSync(path, "utf8"));
      expect(fm).not.toBeNull();
      expect(fm!.name).toBe(s);
      expect(fm!.description?.length ?? 0).toBeGreaterThan(0);
    });
  }
});

describe("top-level assets", () => {
  test("AGENTS.md exists and is non-empty", () => {
    const content = readFileSync(join(ROOT, "AGENTS.md"), "utf8");
    expect(content.trim().length).toBeGreaterThan(0);
  });

  test("opencode.jsonc is valid and non-empty", () => {
    const content = readFileSync(join(ROOT, "opencode.jsonc"), "utf8");
    expect(content.trim().length).toBeGreaterThan(0);
    expect(content).toContain("$schema");
  });
});
