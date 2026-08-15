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
- **Node.js 20+**（需手动安装，见下文）
- 无需预装 pnpm / git（脚本自动处理）

## 第一步：安装 Node.js（必须手动装，一次性）

> 脚本**不会**自动安装 Node.js，必须手动装一次。Node.js 是后续一切的基础。

1. 打开 <https://nodejs.org/>，下载 **LTS 版**（绿色按钮，Windows Installer 即 `.msi` 文件）
2. 双击下载的 `.msi` 安装包，一路「下一步」即可（默认选项即可，无需改动）
3. 装完后**关闭所有已打开的 PowerShell/终端窗口**，重新开一个，输入以下命令验证：
   ```
   node --version
   ```
   出现类似 `v22.x.x` 的输出即安装成功（若提示"不是内部或外部命令"，重启电脑后再试）

> 其它安装方式（任选其一）：
> - 微软商店：搜索「Node.js LTS」点安装
> - winget 命令：`winget install OpenJS.NodeJS.LTS`
> - 如果你电脑上已经有任何可用的 Node.js（其他软件自带），可跳过此步，脚本会自动检测

## 第二步：一键安装（Windows）

1. 下载本仓库压缩包（Code → Download ZIP），解压到任意目录（路径不要含中文）
2. **双击运行 `install.bat`**（推荐，双击即装；若系统中文兼容有问题就用 `一键安装.bat`）
3. 脚本会自动完成：装 pnpm → 装客户端依赖 → 恢复插件配置 → 装插件 → 启动客户端（首次约 5-15 分钟，取决于网络）
4. 客户端窗口自动打开

> 双击 `.bat` 是最省事的方式（Windows 允许双击 `.bat`，但双击 `.ps1` 不会执行）。
> 若双击 `.bat` 弹出安全警告，点「更多信息 → 仍要运行」。
> 若提示需要权限，请以**管理员身份**运行（右键 .bat → 以管理员身份运行，pnpm 全局安装需要）。

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
