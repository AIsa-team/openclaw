---
summary: "Unified access to China's top AI models (Qwen, Kimi, GLM, MiniMax) via AIsa"
read_when:
  - You want access to Chinese AI models with one API key
  - You want AIsa setup guidance
title: "AIsa"
---

# AIsa — China's Top AI Models, One API Key

**AIsa** provides production-grade access to China's best AI models through a single API key and OpenAI-compatible endpoint. One key for Qwen, Kimi, GLM, and MiniMax — no per-provider signup required.

## Why AIsa

- **One key for all Chinese models** — Qwen, Kimi, GLM, MiniMax — no more juggling 4+ accounts.
- **OpenAI-compatible** — Standard `/v1` endpoints, works with any OpenAI SDK.
- **No daily request limits** — Production-ready, unlike free tiers.
- **Unified billing** — Single account for all providers.

## Default Models

| Model ID        | Name         | Developer   | Best For                    | Context | Vision |
| --------------- | ------------ | ----------- | --------------------------- | ------- | ------ |
| `minimax-m2.1`  | MiniMax M2.1 | MiniMax     | Fast text tasks             | 200k    | No     |
| `kimi-k2.5`     | Kimi K2.5    | Moonshot AI | Long-context tasks (default)| 256k    | No     |
| `qwen3-max`     | Qwen3 Max    | Alibaba     | Complex reasoning           | 256k    | Yes    |
| `glm-5`         | GLM-5        | Zhipu AI    | Agentic engineering         | 200k    | Yes    |

## Setup

### 1. Get API Key

1. Visit the [AIsa Marketplace](https://marketplace.aisa.one/)
2. Sign up or log in
3. Navigate to API Keys and generate a new key
4. Copy the key

### 2. Configure OpenClaw

**Option A: Interactive Setup (Recommended)**

```bash
openclaw onboard --auth-choice aisa-api-key
```

**Option B: Environment Variable**

```bash
export AISA_API_KEY="your-api-key-here"
```

### 3. Verify

```bash
openclaw models set aisa/kimi-k2.5
openclaw tui
```

## Which Model Should I Use?

| Use Case                | Recommended Model  | Why                                  |
| ----------------------- | ------------------ | ------------------------------------ |
| **Long context**        | `kimi-k2.5`        | 256k context, great value (default)  |
| **Complex reasoning**   | `qwen3-max`        | Strongest Qwen model                 |
| **Agentic workflows**   | `glm-5`            | Built for agentic engineering        |
| **Fast text**           | `minimax-m2.1`     | Lowest cost, quick processing        |

Change your default model anytime:

```bash
openclaw models set aisa/kimi-k2.5
openclaw models set aisa/qwen3-max
openclaw models set aisa/glm-5
```

## Troubleshooting

### API key not recognized

```bash
echo $AISA_API_KEY
openclaw models list | grep aisa
```

### Connection issues

AIsa API is at `https://api.aisa.one/v1`. Ensure your network allows HTTPS connections.

## Related Documentation

- [OpenClaw Configuration](/gateway/configuration)
- [Model Providers](/concepts/model-providers)
- [AIsa API Documentation](https://aisa.mintlify.app/api-reference/introduction)
