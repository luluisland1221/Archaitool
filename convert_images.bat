@echo off
echo 🚀 PNG到WebP批量转换工具
echo ========================================

REM 检查Python是否安装
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ 未找到Python，请先安装Python
    echo 下载地址: https://www.python.org/downloads/
    pause
    exit /b
)

echo ✅ Python已安装

REM 检查PIL是否安装
python -c "import PIL" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  正在安装Pillow库...
    python -m pip install Pillow
    if %errorlevel% neq 0 (
        echo ❌ Pillow安装失败，请手动安装: pip install Pillow
        pause
        exit /b
    )
    echo ✅ Pillow安装成功
)

echo ✅ 环境检查完成
echo.

REM 执行转换脚本
python convert_to_webp.py

echo.
echo 🎯 转换完成！
echo 📁 WebP文件保存在: public\screenshots-webp\
echo.

pause