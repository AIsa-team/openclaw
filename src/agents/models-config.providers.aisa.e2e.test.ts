import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  AISA_BASE_URL,
  AISA_DEFAULT_MODEL_ID,
  buildAisaProvider,
  resolveImplicitProviders,
} from "./models-config.providers.js";

describe("buildAisaProvider", () => {
  it("returns provider with correct base URL and API type", () => {
    const provider = buildAisaProvider();
    expect(provider.baseUrl).toBe("https://api.aisa.one/v1");
    expect(provider.api).toBe("openai-completions");
  });

  it("includes six default models", () => {
    const provider = buildAisaProvider();
    expect(provider.models).toHaveLength(6);
    const ids = provider.models.map((m) => m.id);
    expect(ids).toContain("kimi-k2.5");
    expect(ids).toContain("qwen3-max");
    expect(ids).toContain("minimax-m2.1");
    expect(ids).toContain("glm-5");
    expect(ids).toContain("deepseek-v3.2");
    expect(ids).toContain("seed-1-8-251228");
  });

  it("marks glm-5 and qwen3-max as vision-capable", () => {
    const provider = buildAisaProvider();
    const glm = provider.models.find((m) => m.id === "glm-5");
    const qwen = provider.models.find((m) => m.id === "qwen3-max");
    expect(glm?.input).toContain("image");
    expect(qwen?.input).toContain("image");
  });

  it("marks reasoning models correctly", () => {
    const provider = buildAisaProvider();
    const reasoningModels = ["kimi-k2.5", "qwen3-max", "glm-5", "deepseek-v3.2", "seed-1-8-251228"];
    const nonReasoningModels = ["minimax-m2.1"];
    for (const model of provider.models) {
      if (reasoningModels.includes(model.id)) {
        expect(model.reasoning).toBe(true);
      }
      if (nonReasoningModels.includes(model.id)) {
        expect(model.reasoning).toBe(false);
      }
    }
  });
});

describe("AIsa provider constants", () => {
  it("exports correct base URL", () => {
    expect(AISA_BASE_URL).toBe("https://api.aisa.one/v1");
  });

  it("exports correct default model ID", () => {
    expect(AISA_DEFAULT_MODEL_ID).toBe("kimi-k2.5");
  });
});

describe("AIsa implicit provider", () => {
  it("should include aisa when AISA_API_KEY is configured", async () => {
    const agentDir = mkdtempSync(join(tmpdir(), "openclaw-test-"));
    const previous = process.env.AISA_API_KEY;
    process.env.AISA_API_KEY = "test-key";

    try {
      const providers = await resolveImplicitProviders({ agentDir });
      expect(providers?.aisa).toBeDefined();
      expect(providers?.aisa?.apiKey).toBe("AISA_API_KEY");
      expect(providers?.aisa?.baseUrl).toBe("https://api.aisa.one/v1");
      expect(providers?.aisa?.api).toBe("openai-completions");
    } finally {
      if (previous === undefined) {
        delete process.env.AISA_API_KEY;
      } else {
        process.env.AISA_API_KEY = previous;
      }
    }
  });

  it("should not include aisa when no API key is configured", async () => {
    const agentDir = mkdtempSync(join(tmpdir(), "openclaw-test-"));
    const previous = process.env.AISA_API_KEY;
    delete process.env.AISA_API_KEY;

    try {
      const providers = await resolveImplicitProviders({ agentDir });
      expect(providers?.aisa).toBeUndefined();
    } finally {
      if (previous !== undefined) {
        process.env.AISA_API_KEY = previous;
      }
    }
  });
});
