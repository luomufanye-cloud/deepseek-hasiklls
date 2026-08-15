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

function Test-Cmd([string]$name, [string]$probe) {
    try { $null = & $probe 2>$null; return $true } catch { return $false }
}

# ---------- 1. 检查环境 ----------
Write-Host "`n[1/5] 检查环境..." -ForegroundColor Yellow
if (-not (Test-Cmd "node" { node --version })) {
    Write-Host "未检测到 Node.js！请先安装 Node.js 20+ (https://nodejs.org/)" -ForegroundColor Red
    Write-Host "安装后重新运行本脚本。"
    Read-Host "按回车退出"; exit 1
}
$nodeVer = node --version
Write-Host "  Node.js: $nodeVer"

if (-not (Test-Cmd "pnpm" { pnpm --version })) {
    Write-Host "  pnpm 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g pnpm
}
$pnpmVer = pnpm --version
Write-Host "  pnpm: $pnpmVer"

# ---------- 2. 安装客户端依赖 ----------
Write-Host "`n[2/5] 安装客户端依赖（首次约 5-15 分钟）..." -ForegroundColor Yellow
Push-Location $ROOT
try {
    pnpm install --no-frozen-lockfile
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
    pnpm install --config.minimumReleaseAge=0
    # chat-skin 是本地插件（未发布 npm），直接复制 + 写入 patch
    $csSrc = Join-Path $ROOT "plugins\dsh-client-chat-skin"
    $csDst = Join-Path $PROFILE_DIR "node_modules\dsh-client-chat-skin"
    if (Test-Path $csSrc) {
        Copy-Item $csSrc $csDst -Recurse -Force
        Write-Host "  chat-skin 已复制到 node_modules"
    }
} finally { Pop-Location }

# ---------- 5. 启动客户端 ----------
Write-Host "`n[5/5] 启动客户端..." -ForegroundColor Yellow
Write-Host "提示：首次启动稍慢，稍等窗口出现。浏览器会打开 http://127.0.0.1:端口" -ForegroundColor DarkGray
Push-Location (Join-Path $ROOT "apps\desktop")
try {
    & (Join-Path $ROOT "node_modules\.pnpm\electron@*\node_modules\electron\dist\electron.exe") "." 2>$null
} finally { Pop-Location }

Write-Host "`n安装完成！皮肤入口：设置 → 外观（Mirage 皮肤 / 壁纸）· 皮肤中心（鲸吟/夕港）· 右下角 🎨（聊天壁纸）" -ForegroundColor Green
