# DeepSeek Harness 美化版 一键安装脚本 (Windows PowerShell)
# 用法：右键 → 使用 PowerShell 运行；或在该目录下执行 ./setup.ps1
# 功能：安装客户端依赖 + 恢复全部美化插件 + 启动客户端
$ErrorActionPreference = "Stop"
$Host.UI.RawUI.WindowTitle = "DeepSeek Harness 一键安装"
$ROOT = Split-Path -Parent $MyInvocation.MyCommand.Path
$DSH_HOME = if ($env:DSH_HOME) { $env:DSH_HOME } else { Join-Path $env:USERPROFILE ".dsh" }
$PROFILE_DIR = Join-Path $DSH_HOME "profiles\web"

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  DeepSeek Harness 美化版一键安装" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "项目目录 : $ROOT"
Write-Host "DSH 目录  : $DSH_HOME"

function Test-Cmd([string]$cmd) {
    $found = Get-Command $cmd -ErrorAction SilentlyContinue
    return [bool]$found
}

# ---------- 1. 检查环境 ----------
Write-Host "`n[1/5] 检查环境..." -ForegroundColor Yellow
if (-not (Test-Cmd "node")) {
    Write-Host "未检测到 Node.js！" -ForegroundColor Red
    Write-Host ""
    Write-Host "请先手动安装 Node.js 20+（脚本不会自动安装）：" -ForegroundColor Yellow
    Write-Host "  1. 打开 https://nodejs.org/ 下载 LTS 版 (.msi)"
    Write-Host "  2. 双击安装包，一路下一步"
    Write-Host "  3. 重开一个 PowerShell，运行 node --version 验证"
    Write-Host "  4. 装好后重新运行本脚本"
    Write-Host ""
    Read-Host "按回车退出"; exit 1
}
$nodeVer = node --version
Write-Host "  Node.js: $nodeVer"

if (-not (Test-Cmd "pnpm")) {
    Write-Host "  pnpm 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g pnpm
}
$pnpmVer = pnpm --version
Write-Host "  pnpm: $pnpmVer"

# ---------- 2. 安装客户端依赖 ----------
Write-Host "`n[2/5] 安装客户端依赖（首次约 5-15 分钟，网络慢时更久）..." -ForegroundColor Yellow
Push-Location $ROOT
try {
    $step2ok = $false
    # 第一轮：官方源重试 3 次
    for ($i = 1; $i -le 3; $i++) {
        pnpm install --no-frozen-lockfile
        if ($LASTEXITCODE -eq 0) { $step2ok = $true; break }
        Write-Host "  安装失败，10 秒后重试 ($i/3)..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    }
    # 第二轮：切换国内 npm 镜像再试
    if (-not $step2ok) {
        Write-Host "  官方源失败，切换国内镜像（npmmirror）..." -ForegroundColor Yellow
        for ($i = 1; $i -le 2; $i++) {
            pnpm install --no-frozen-lockfile --registry=https://registry.npmmirror.com
            if ($LASTEXITCODE -eq 0) { $step2ok = $true; break }
            Start-Sleep -Seconds 10
        }
    }
    if (-not $step2ok) {
        Write-Host "错误：客户端依赖安装失败，请检查网络后重新运行" -ForegroundColor Red
        Read-Host "按回车退出"; exit 1
    }
} finally { Pop-Location }

# ---------- 3. 恢复插件配置 ----------
Write-Host "`n[3/5] 恢复插件配置到 $PROFILE_DIR ..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path $PROFILE_DIR | Out-Null
$pluginSrc = Join-Path $ROOT "plugins\profile"
Copy-Item (Join-Path $pluginSrc "package.json") $PROFILE_DIR -Force
Copy-Item (Join-Path $pluginSrc "pnpm-workspace.yaml") $PROFILE_DIR -Force
Copy-Item (Join-Path $pluginSrc "cordis.yml") $PROFILE_DIR -Force
Copy-Item (Join-Path $pluginSrc "cordis.patch.yml") $PROFILE_DIR -Force

# ---------- 4. 安装插件 ----------
Write-Host "`n[4/5] 安装插件（含 chat-skin 本地插件）..." -ForegroundColor Yellow
Push-Location $PROFILE_DIR
try {
    $step4ok = $false
    # 第一轮：官方源重试 3 次
    for ($i = 1; $i -le 3; $i++) {
        pnpm install --config.minimumReleaseAge=0
        if ($LASTEXITCODE -eq 0) { $step4ok = $true; break }
        Write-Host "  安装失败，10 秒后重试 ($i/3)..." -ForegroundColor Yellow
        Start-Sleep -Seconds 10
    }
    # 第二轮：切换国内 npm 镜像再试
    if (-not $step4ok) {
        Write-Host "  官方源失败，切换国内镜像（npmmirror）..." -ForegroundColor Yellow
        for ($i = 1; $i -le 2; $i++) {
            pnpm install --config.minimumReleaseAge=0 --registry=https://registry.npmmirror.com
            if ($LASTEXITCODE -eq 0) { $step4ok = $true; break }
            Start-Sleep -Seconds 10
        }
    }
    if (-not $step4ok) {
        Write-Host "错误：插件安装失败，请检查网络后重新运行" -ForegroundColor Red
        Read-Host "按回车退出"; exit 1
    }
    # chat-skin 是本地插件（未发布 npm），直接复制 + 写入 patch
    $csSrc = Join-Path $ROOT "plugins\dsh-client-chat-skin"
    $csDst = Join-Path $PROFILE_DIR "node_modules\dsh-client-chat-skin"
    if (Test-Path $csSrc) {
        Copy-Item $csSrc $csDst -Recurse -Force
        Write-Host "  chat-skin 已复制到 node_modules"
    }
} finally { Pop-Location }

# ---------- 5. 启动客户端 ----------
Write-Host "`n[5/5] 准备客户端运行环境..." -ForegroundColor Yellow
$electronDir = Get-ChildItem (Join-Path $ROOT "node_modules\.pnpm") -Directory -Filter "electron@*" -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $electronDir) {
    Write-Host "错误：未找到 electron，请检查第 2 步是否成功" -ForegroundColor Red
    Read-Host "按回车退出"; exit 1
}
$electronExe = Join-Path $electronDir.FullName "node_modules\electron\dist\electron.exe"

# electron 的 postinstall 负责下载运行二进制，网络抖动时可能失败，这里自愈重试
# （直连失败会自动切换国内镜像，无需 VPN）
if (-not (Test-Path $electronExe)) {
    Write-Host "  electron 二进制缺失，正在补装..." -ForegroundColor Yellow
    $installJs = Join-Path $electronDir.FullName "node_modules\electron\install.js"
    $ok = $false

    # 第一轮：直连 GitHub 重试 3 次
    Write-Host "  方式 1/2：直连 GitHub（3 次）..." -ForegroundColor DarkGray
    for ($i = 1; $i -le 3; $i++) {
        node $installJs 2>$null
        if (Test-Path $electronExe) { $ok = $true; break }
        Start-Sleep -Seconds 5
    }

    # 第二轮：走国内镜像（npmmirror）再试 3 次
    if (-not $ok) {
        Write-Host "  直连失败，切换国内镜像（npmmirror）..." -ForegroundColor Yellow
        $env:ELECTRON_MIRROR = "https://npmmirror.com/mirrors/electron/"
        for ($i = 1; $i -le 3; $i++) {
            node $installJs 2>$null
            if (Test-Path $electronExe) { $ok = $true; break }
            Start-Sleep -Seconds 5
        }
        Remove-Item Env:ELECTRON_MIRROR -ErrorAction SilentlyContinue
    }

    if (-not $ok) {
        Write-Host "错误：electron 二进制下载失败（网络问题）。" -ForegroundColor Red
        Write-Host "请检查网络后重新运行本脚本，或手动设置镜像环境变量后重试：" -ForegroundColor Yellow
        Write-Host "  `$env:ELECTRON_MIRROR='https://npmmirror.com/mirrors/electron/'" -ForegroundColor Yellow
        Read-Host "按回车退出"; exit 1
    }
}

Write-Host "  启动客户端..." -ForegroundColor Yellow
Write-Host "提示：首次启动稍慢，稍等窗口出现。浏览器会打开 http://127.0.0.1:端口" -ForegroundColor DarkGray
Push-Location (Join-Path $ROOT "apps\desktop")
try {
    & $electronExe "." 2>$null
} finally { Pop-Location }

Write-Host "`n安装完成！皮肤入口：设置 → 外观（Mirage 皮肤 / 壁纸）· 皮肤中心（鲸吟/夕港）· 右下角 🎨（聊天壁纸）" -ForegroundColor Green
