---
summary: "通过 AIsa 一个 API Key 访问中国顶级 AI 模型（Qwen、Kimi、GLM、MiniMax）"
read_when:
  - 你想用一个 API Key 访问中国 AI 模型
  - 你需要 AIsa 配置指南
title: "AIsa"
---

# AIsa — 中国顶级 AI 模型，一个 API Key

**AIsa** 通过单一 API Key 和 OpenAI 兼容端点，提供对中国最佳 AI 模型的生产级访问。一个 Key 即可使用 Qwen、Kimi、GLM 和 MiniMax。

## 为什么选择 AIsa

- **一个 Key 全部中国模型** — Qwen、Kimi、GLM、MiniMax — 无需管理多个账户。
- **OpenAI 兼容** — 标准 `/v1` 端点，兼容任何 OpenAI SDK。
- **无每日请求限制** — 生产就绪。
- **统一计费** — 所有厂商一个账户。

## 默认模型

| 模型 ID         | 名称         | 开发者      | 适用场景                    | 上下文  | 视觉   |
| --------------- | ------------ | ----------- | --------------------------- | ------- | ------ |
| `minimax-m2.1`  | MiniMax M2.1 | MiniMax     | 快速文本                    | 200k    | 否     |
| `kimi-k2.5`     | Kimi K2.5    | Moonshot AI | 长上下文任务（默认）         | 256k    | 否     |
| `qwen3-max`     | Qwen3 Max    | 阿里巴巴    | 复杂推理                    | 256k    | 是     |
| `glm-5`         | GLM-5        | 智谱 AI     | 智能体工程                  | 200k    | 是     |

## 设置

### 1. 获取 API Key

1. 访问 [AIsa Marketplace](https://marketplace.aisa.one/)
2. 注册或登录
3. 导航到 API Keys 并生成新密钥
4. 复制密钥

### 2. 配置 OpenClaw

**方式 A：交互式设置（推荐）**

```bash
openclaw onboard --auth-choice aisa-api-key
```

**方式 B：环境变量**

```bash
export AISA_API_KEY="your-api-key-here"
```

### 3. 验证

```bash
openclaw models set aisa/kimi-k2.5
openclaw tui
```

## 推荐模型

| 使用场景              | 推荐模型           | 原因                                 |
| --------------------- | ------------------ | ------------------------------------ |
| **长上下文**          | `kimi-k2.5`        | 256k上下文，高性价比（默认）          |
| **复杂推理**          | `qwen3-max`        | 最强 Qwen 模型                       |
| **智能体工作流**      | `glm-5`            | 专为智能体工程设计                    |
| **快速文本**          | `minimax-m2.1`     | 最低成本，快速处理                    |

随时切换默认模型：

```bash
openclaw models set aisa/kimi-k2.5
openclaw models set aisa/qwen3-max
openclaw models set aisa/glm-5
```

## 故障排除

### API Key 未识别

```bash
echo $AISA_API_KEY
openclaw models list | grep aisa
```

### 连接问题

AIsa API 地址为 `https://api.aisa.one/v1`，请确保网络允许 HTTPS 连接。

## 相关文档

- [OpenClaw 配置](/gateway/configuration)
- [模型提供商](/concepts/model-providers)
- [AIsa API 文档](https://aisa.mintlify.app/api-reference/introduction)
