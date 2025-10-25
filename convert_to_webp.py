#!/usr/bin/env python3
"""
批量转换PNG到WebP格式的自动化脚本
需要安装: pip install Pillow

运行方式: python convert_to_webp.py
"""

import os
import sys
from pathlib import Path
from PIL import Image
import concurrent.futures
import time

def convert_single_image(input_path, output_path, target_width=800, quality=75):
    """转换单个PNG文件到WebP"""
    try:
        with Image.open(input_path) as img:
            # 计算新的高度，保持宽高比
            width, height = img.size
            if width > target_width:
                new_height = int(height * target_width / width)
                img = img.resize((target_width, new_height), Image.Resampling.LANCZOS)

            # 转换为WebP
            img.save(output_path, 'WEBP', quality=quality, method=6)
            return True
    except Exception as e:
        print(f"❌ 转换失败 {input_path}: {e}")
        return False

def batch_convert_to_webp():
    """批量转换所有PNG文件"""
    input_dir = Path('public/screenshots')
    output_dir = Path('public/screenshots-webp')

    # 检查输入目录
    if not input_dir.exists():
        print(f"❌ 输入目录不存在: {input_dir}")
        return

    # 创建输出目录
    output_dir.mkdir(exist_ok=True)

    # 获取所有PNG文件
    png_files = list(input_dir.glob('*.png'))
    if not png_files:
        print(f"❌ 在 {input_dir} 中没有找到PNG文件")
        return

    print(f"🖼️  找到 {len(png_files)} 个PNG文件")
    print(f"📁 输入目录: {input_dir}")
    print(f"📁 输出目录: {output_dir}")

    # 统计原始大小
    total_original_size = sum(f.stat().st_size for f in png_files)
    print(f"📊 原始总大小: {total_original_size / 1024 / 1024:.2f} MB")

    # 批量转换
    start_time = time.time()
    converted_count = 0
    failed_count = 0

    # 使用线程池并行处理（但限制并发数避免过载）
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        future_to_file = {}

        for png_file in png_files:
            output_path = output_dir / f"{png_file.stem}.webp"

            # 如果WebP文件已存在且较新，跳过
            if output_path.exists():
                png_mtime = png_file.stat().st_mtime
                webp_mtime = output_path.stat().st_mtime
                if webp_mtime >= png_mtime:
                    print(f"⏭️  {png_file.name} - 已存在WebP版本")
                    converted_count += 1
                    continue

            future = executor.submit(
                convert_single_image,
                str(png_file),
                str(output_path),
                800,  # target_width
                75   # quality
            )
            future_to_file[future] = png_file.name

        # 收集结果
        for future in concurrent.futures.as_completed(future_to_file):
            filename = future_to_file[future]
            try:
                success = future.result()
                if success:
                    converted_count += 1
                    print(f"✅ {filename} - 转换完成")
                else:
                    failed_count += 1
                    print(f"❌ {filename} - 转换失败")
            except Exception as e:
                failed_count += 1
                print(f"❌ {filename} - 处理错误: {e}")

    # 计算转换后大小
    webp_files = list(output_dir.glob('*.webp'))
    total_webp_size = sum(f.stat().st_size for f in webp_files)

    # 显示统计信息
    end_time = time.time()
    duration = end_time - start_time

    print(f"\n🎉 转换完成！")
    print(f"⏱️  用时: {duration:.2f} 秒")
    print(f"✅ 成功: {converted_count} 个")
    print(f"❌ 失败: {failed_count} 个")
    print(f"📊 转换后大小: {total_webp_size / 1024 / 1024:.2f} MB")

    if total_original_size > 0 and total_webp_size > 0:
        savings = (total_original_size - total_webp_size) / total_original_size * 100
        print(f"💾 节省空间: {savings:.1f}% ({(total_original_size - total_webp_size) / 1024 / 1024:.2f} MB)")

    print(f"📁 WebP文件保存在: {output_dir}")

    return converted_count > 0

def check_dependencies():
    """检查依赖是否安装"""
    try:
        from PIL import Image
        return True
    except ImportError:
        print("❌ 需要安装Pillow库:")
        print("   pip install Pillow")
        print("   或者: python -m pip install Pillow")
        return False

def main():
    print("🚀 PNG到WebP批量转换工具")
    print("=" * 50)

    # 检查依赖
    if not check_dependencies():
        print("\n💡 请先安装依赖后重试")
        sys.exit(1)

    # 执行转换
    success = batch_convert_to_webp()

    if success:
        print("\n🎯 下一步操作:")
        print("1. 检查生成的WebP文件")
        print("2. 运行: node update-webp-references.cjs")
        print("3. 提交到GitHub")
        print("4. 网站将自动使用优化的WebP图片")
    else:
        print("\n❌ 转换失败，请检查错误信息")

if __name__ == "__main__":
    main()