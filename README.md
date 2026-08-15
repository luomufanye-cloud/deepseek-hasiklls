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
| modlens | 模型透镜（需自行配置视觉引擎 API Key，见下文） |
| dsh-better-sidebar | 侧边栏增强（标题栏兼容已开启） |
| forkprobe-dsh | 代码探查工具 |

## 环境要求

- **Windows 10/11**
- **Node.js 20+**（需手动安装，见下文）
- 无需预装 pnpm / git（脚本自动处理）
- **网络**：无需 VPN。脚本内置国内镜像自动回退（npm 官源失败自动切 npmmirror；electron 直连失败自动切国内镜像）

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
> 安装过程全程自动化，网络波动时脚本会自动重试（每步最多 3 次）并自动切换国内镜像，无需人工干预。

## 第三步：配置模型 API Key（必须，否则不能对话）

> 出于安全，本仓库**不含任何 API Key**。装好后首次使用需要自己配置，否则聊天界面能看到但无法对话。

配置方式（任选其一）：

**方式 A：环境变量（推荐）**
1. 打开系统环境变量设置（Win 键 → 搜索"环境变量" → 编辑系统环境变量）
2. 新建用户变量：
   - 变量名：`DEEPSEEK_API_KEY`
   - 变量值：你的 DeepSeek API Key（在 <https://platform.deepseek.com/> 申请）
3. 重启 DeepSeek Harness 客户端

**方式 B：credentials 文件**
1. 编辑 `%USERPROFILE%\.dsh\.credentials.yaml`
2. 添加：
   ```yaml
   DEEPSEEK_API_KEY: sk-你的密钥
   ```
3. 保存后重启客户端

> 其它模型服务商（OpenAI / Gemini / Claude 等）同理：创建对应的环境变量或 credentials 条目即可，在设置 → 模型里选择对应 provider 与模型。

## 使用说明

- **设置 → 外观（Theme）**：Mirage 皮肤切换、上传自定义壁纸（透明度/模糊调节）、强调色
- **设置 → 皮肤中心**：鲸吟 / 夕港 / Blue Fantasy 等 10 款皮肤，支持试穿
- **右下角 🎨 悬浮按钮**：聊天区快速换壁纸/调色
- **设置 → 桌宠**：Live2D 鲸鱼娘宠物开关与配置

### 二次元壁纸从哪来

各插件均支持**上传本地图片**作为壁纸。自行准备任意动漫壁纸（1920×1080 为佳）上传即可；或在设置 → 外观里使用内置渐变预设。

## 与原作者环境的差异（须知）

安装后的界面与原作者一致（插件、皮肤预设、anime 壁纸预设均已打包）。以下内容**不在**本仓库中，需要自己设置：

- **API Key**：见上文第三步（关键）
- **个人偏好设置**（settings.yaml）：宠物名称、已选的皮肤、壁纸选择等个人化设置不打包，打开后默认外观，自行在设置里挑选
- **本地壁纸图片**：原作者下载的壁纸素材未打包，自行准备图片上传即可（代码内引用的 anime 预设壁纸已包含）
- **modlens 视觉引擎**：需要配置 Gemini / OpenAI 兼容端点 API Key，未配置时该插件自动禁用，不影响其它功能

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

- **安装卡在某一步不动**：多为网络波动，脚本会自动重试并切镜像，等待即可（首次安装 5-15 分钟属正常）
- **提示 electron 二进制缺失**：脚本会自动补装（直连失败切国内镜像），若 6 次尝试均失败说明网络异常，检查网络后重新运行
- **双击 .bat 一闪而过**：以管理员身份重新运行；或在 PowerShell 中执行 `.\install.bat` 查看错误输出
- **端口被占用**：DSH 每次启动使用随机端口，自动处理，无需配置
- **插件未生效**：确认 `%USERPROFILE%\.dsh\profiles\web\package.json` 的 `dsh.profile.bundles` 包含全部插件清单
- **皮肤/壁纸选择不保存**：偏好存于浏览器 localStorage，换端口会重置——用「桌宠配置」等写文件的设置项可跨重启持久化
- **无法对话（能看到界面）**：未配置 API Key，见上文「第三步」
- **modlens 不可用**：需要配置视觉引擎（Gemini / OpenAI 兼容端点），未配置时自动禁用，不影响其它功能

## 插件卸载

```powershell
npx -y @deepseek-ai/dsh plugin --profile web remove <插件包名>
```

## 许可

- 客户端：DeepSeek Harness 官方许可（见根目录 LICENSE）
- 各插件：以各自仓库许可为准（详见插件来源）
- 本仓库不包含任何 API Key 等敏感信息
