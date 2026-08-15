# DeepSeek Harness 美化版

DeepSeek Harness 客户端 + 全套美化插件，开箱即用。包含：二次元皮肤、壁纸、聊天区换肤、自定义侧边栏等。

> 本仓库包含完整客户端源码（DeepSeek Harness 官方代码）与已配置好的插件生态，下载后一键安装即可。

## 已包含的插件

| 插件 | 说明 |
|---|---|
| dsh-web-ui（全家桶） | 皮肤中心 10 款皮肤（鲸吟/夕港/Blue Fantasy 等二次元主题）、任务看板、Git 图谱、SSH、Live2D 鲸鱼娘宠物等 |
| dsh-dream-skin | 8 套 Mirage 主题（深海渊/极光/星云/余烬/午夜/象牙/晨雾/蔷薇粉）+ 自定义壁纸（透明度/模糊/URL/渐变）+ 强调色 + 主题包分享 |
| dsh-chat-skin | 聊天区独立壁纸 + 自由调色盘，右下角 🎨 悬浮按钮，跨重启持久化 |
| dsh-visualize | 对话可视化 |
| dsh-genui | 界面生成工具 |
| modlens | 模型透镜（需自行配置视觉引擎 API Key） |
| dsh-better-sidebar | 侧边栏增强（标题栏兼容已开启） |
| forkprobe-dsh | 代码探查工具 |

## 环境要求

- **Windows 10/11**
- **Node.js 20+**：<https://nodejs.org/>（未安装时脚本会自动装 pnpm，但 Node 必须手动装）
- 无需预装 pnpm / git（脚本自动处理）

## 一键安装（Windows）

1. 下载本仓库压缩包（Code → Download ZIP），解压到任意目录（路径不要含中文）
2. 双击运行 **`setup.ps1`**（若提示安全警告，选「仍要运行」；或在 PowerShell 中执行 `./setup.ps1`）
3. 等待脚本完成（首次安装约 5-15 分钟，取决于网络）
4. 客户端窗口自动打开

> 如果右键没有「使用 PowerShell 运行」，可以先打开 PowerShell，`cd` 到解压目录后执行：
> ```powershell
> Set-ExecutionPolicy -Scope Process Bypass; ./setup.ps1
> ```

## 使用说明

- **设置 → 外观（Theme）**：Mirage 皮肤切换、上传自定义壁纸（透明度/模糊调节）、强调色
- **设置 → 皮肤中心**：鲸吟 / 夕港 / Blue Fantasy 等 10 款皮肤，支持试穿
- **右下角 🎨 悬浮按钮**：聊天区快速换壁纸/调色
- **设置 → 桌宠**：Live2D 鲸鱼娘宠物开关与配置

### 二次元壁纸从哪来

各插件均支持**上传本地图片**作为壁纸。自行准备任意动漫壁纸（1920×1080 为佳）上传即可；或在设置 → 外观里使用内置渐变预设。

## 手动安装（不使用脚本）

```powershell
# 1. 安装客户端依赖
pnpm install --no-frozen-lockfile

# 2. 恢复插件配置（把 plugins\profile 下文件复制到 %USERPROFILE%\.dsh\profiles\web\）
#    package.json / pnpm-workspace.yaml / cordis.yml / cordis.patch.yml

# 3. 安装插件依赖
cd $env:USERPROFILE\.dsh\profiles\web
pnpm install --config.minimumReleaseAge=0

# 4. 复制本地插件
Copy-Item ..\..\..\plugins\dsh-client-chat-skin .\node_modules\ -Recurse

# 5. 启动
cd apps\desktop
..\..\node_modules\.pnpm\electron@*\node_modules\electron\dist\electron.exe .
```

## 常见问题

- **端口被占用**：DSH 每次启动使用随机端口，自动处理，无需配置
- **插件未生效**：确认 `%USERPROFILE%\.dsh\profiles\web\package.json` 的 `dsh.profile.bundles` 包含全部插件清单
- **皮肤/壁纸选择不保存**：偏好存于浏览器 localStorage，换端口会重置——用「桌宠配置」等写文件的设置项可跨重启持久化
- **modlens 不可用**：需要配置视觉引擎（Gemini / OpenAI 兼容端点），未配置时自动禁用

## 插件卸载

```powershell
npx -y @deepseek-ai/dsh plugin --profile web remove <插件包名>
```

## 许可

- 客户端：DeepSeek Harness 官方许可（见根目录 LICENSE）
- 各插件：以各自仓库许可为准（详见插件来源）
- 本仓库不包含任何 API Key 等敏感信息
