# Serenity Ultimate US Stock Terminal

面向中文用户的美股研究终端，包含实时行情、Serenity 研究评分、Smart Money 持仓榜、X 喊单监控、中国看盘窗口、美元人民币估算和证据面板。

> 这是研究辅助工具，不是投资建议，也不保证任何收益。

## 本地运行

```powershell
python server.py --port 8787
```

打开：

```text
http://127.0.0.1:8787
```

## 在线部署

这个项目不是纯静态页面，不能只用 GitHub Pages，因为它需要 Python 后端代理 Yahoo Finance、X API、SEC 和图片资源。

推荐流程：

1. 上传到 GitHub 仓库。
2. 用 Render、Railway、Fly.io、VPS 或类似平台部署 Python Web Service。
3. 启动命令：

```bash
python server.py --host 0.0.0.0 --port $PORT
```

Render 可以直接使用仓库里的 `render.yaml`。

## X 喊单监控

监控面板默认跟踪 `@aleabitoreddit`。官方实时读取需要 X API v2 Bearer Token。

本地方式：

```powershell
$env:X_BEARER_TOKEN="你的 Bearer Token"
python server.py --port 8787
```

云端方式：在部署平台的环境变量里设置：

```text
X_BEARER_TOKEN=你的 Bearer Token
```

也可以在页面面板里粘贴临时 token。这个 token 只保存在当前浏览器的 `localStorage`，不会写入代码仓库。

安全提醒：如果你把网站公开给别人访问，不建议在云端配置自己的 `X_BEARER_TOKEN`，否则访问者会共用你的 X API 额度。更稳的做法是只自己使用，或者让每个用户在浏览器里填自己的临时 token。

## 环境变量

```text
PORT=8787
HOST=127.0.0.1
X_BEARER_TOKEN=
TWITTER_BEARER_TOKEN=
SERENITY_X_BEARER_TOKEN=
SERENITY_X_RSS_URL=
SERENITY_MONITOR_TTL_SECONDS=90
```

## GitHub 上传

如果本机安装了 Git：

```bash
git init
git add .
git commit -m "Initial Serenity US stock terminal"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

注意：不要提交 `.env` 或任何真实 API token。

## 数据源

- Yahoo Finance chart API，用于行情和汇率。
- SEC EDGAR，用于美股公司 filings。
- X API v2 或自定义 RSS，用于喊单监控。
- 公司官网 favicon 和公开头像资源，用于持仓榜视觉识别。

## 文件

- `server.py`: 本地和云端 Python Web 服务。
- `index.html`: 应用入口。
- `app.js`: 行情、评分、持仓榜、监控和交互逻辑。
- `styles.css`: 产品 UI 样式。
- `PRODUCT.md`, `DESIGN.md`, `SERENITY_FRAMEWORK.md`: 产品和研究框架说明。
