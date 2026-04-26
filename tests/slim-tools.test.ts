import { describe, test, expect } from "bun:test";
import slimTools from "../plugins/slim-tools.ts";

async function getHook() {
  const hooks = await (slimTools.server as any)({});
  const hook = hooks["tool.definition"];
  if (!hook) throw new Error("tool.definition hook missing");
  return hook;
}

describe("slim-tools", () => {
  test("id is set", () => {
    expect(slimTools.id).toBe("slim-tools");
  });

  test("short description is unchanged", async () => {
    const hook = await getHook();
    const output = { description: "short desc", parameters: { a: 1 } };
    await hook({ toolID: "x" }, output);
    expect(output.description).toBe("short desc");
    expect(output.parameters).toEqual({ a: 1 });
  });

  test("description of exactly 250 chars is unchanged", async () => {
    const hook = await getHook();
    const desc = "a".repeat(250);
    const output = { description: desc, parameters: {} };
    await hook({ toolID: "x" }, output);
    expect(output.description).toBe(desc);
    expect(output.description.length).toBe(250);
  });

  test("description longer than 250 chars is truncated to 250 + ellipsis", async () => {
    const hook = await getHook();
    const desc = "a".repeat(600);
    const output = { description: desc, parameters: {} };
    await hook({ toolID: "x" }, output);
    expect(output.description).toBe("a".repeat(250) + "...");
    expect(output.description.length).toBe(253);
  });

  test("parameters are never mutated", async () => {
    const hook = await getHook();
    const params = { type: "object", properties: { foo: { type: "string" } } };
    const output = { description: "x".repeat(1000), parameters: params };
    await hook({ toolID: "x" }, output);
    expect(output.parameters).toBe(params);
  });
});
