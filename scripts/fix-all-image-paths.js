#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('🔧 批量修复所有工具的image字段路径\n');

// 读取工具数据文件
const toolsFile = path.join(process.cwd(), 'src/data/tools.ts');
let content = fs.readFileSync(toolsFile, 'utf8');

// 获取所有截图文件
const screenshotsDir = path.join(process.cwd(), 'public/screenshots');
const screenshotFiles = fs.readdirSync(screenshotsDir)
  .filter(f => f.endsWith('.webp') || f.endsWith('.png'))
  .sort();

console.log(`📁 找到 ${screenshotFiles.length} 个截图文件`);

// 工具名称到文件名的映射规则
function findScreenshotFile(toolName, toolId) {
  // 优先尝试精确匹配
  let exactMatch = screenshotFiles.find(file =>
    file.toLowerCase().includes(toolName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, ''))
  );

  if (exactMatch) return exactMatch;

  // 尝试ID匹配
  let idMatch = screenshotFiles.find(file =>
    file.toLowerCase().includes(toolId.toLowerCase().replace(/-/g, '_'))
  );

  if (idMatch) return idMatch;

  // 尝试常见模式匹配
  const patterns = [
    toolName.toLowerCase().replace(/\s+/g, '_'),
    toolName.toLowerCase().replace(/\s+/g, ''),
    toolId.toLowerCase().replace(/-/g, '_'),
    toolId.toLowerCase()
  ];

  for (let pattern of patterns) {
    let match = screenshotFiles.find(file =>
      file.toLowerCase().includes(pattern)
    );
    if (match) return match;
  }

  return null;
}

// 解析工具数据
const lines = content.split('\n');
let currentTool = null;
let changes = [];
let inToolsArray = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // 检测工具开始
  if (line.trim().startsWith('id:')) {
    const idMatch = line.match(/id:\s*\"([^\"]+)\"/);
    if (idMatch) {
      currentTool = { id: idMatch[1], name: null, imageLine: null, lineIndex: i };
    }
  }

  // 检测工具名称
  if (currentTool && line.trim().startsWith('name:') && !currentTool.name) {
    const nameMatch = line.match(/name:\s*\"([^\"]+)\"/);
    if (nameMatch) {
      currentTool.name = nameMatch[1];
    }
  }

  // 检测image字段
  if (currentTool && line.trim().startsWith('image:') && !currentTool.imageLine) {
    if (line.includes('/screenshots/')) {
      // 已经是文件路径，跳过
      console.log(`✅ ${currentTool.name}: 已经有正确路径`);
      currentTool = null;
    } else {
      currentTool.imageLine = i;
      const imageMatch = line.match(/image:\s*\"([^\"]+)\"/);
      if (imageMatch) {
        currentTool.currentImage = imageMatch[1];
      }
    }
  }

  // 工具定义结束，处理收集到的工具
  if (currentTool && (line.includes('}') || line.includes('url:'))) {
    if (currentTool.imageLine !== null) {
      // 查找对应的截图文件
      const screenshotFile = findScreenshotFile(currentTool.name, currentTool.id);

      if (screenshotFile) {
        const oldLine = lines[currentTool.imageLine];
        const newLine = `            image: "/screenshots/${screenshotFile}",`;

        lines[currentTool.imageLine] = newLine;
        changes.push({
          name: currentTool.name,
          id: currentTool.id,
          oldImage: currentTool.currentImage,
          newFile: screenshotFile
        });

        console.log(`🔄 ${currentTool.name}: ${currentTool.currentImage} → /screenshots/${screenshotFile}`);
      } else {
        console.log(`⚠️  ${currentTool.name}: 未找到对应截图文件`);
        console.log(`   ID: ${currentTool.id}, 名称: ${currentTool.name}`);
      }
    }
    currentTool = null;
  }
}

// 写回文件
const newContent = lines.join('\n');
fs.writeFileSync(toolsFile, newContent);

console.log(`\n📊 修复结果统计:`);
console.log(`  ✅ 成功修复: ${changes.length} 个工具`);
console.log(`  📁 截图文件总数: ${screenshotFiles.length} 个`);
console.log(`  📝 工具总数: 58 个`);

if (changes.length > 0) {
  console.log(`\n🎉 修复详情:`);
  changes.forEach((change, index) => {
    console.log(`  ${index + 1}. ${change.name}`);
    console.log(`     ${change.oldImage}`);
    console.log(`     → /screenshots/${change.newFile}`);
  });

  // 保存修复记录
  const record = {
    timestamp: new Date().toISOString(),
    totalTools: 58,
    fixedTools: changes.length,
    screenshotFiles: screenshotFiles.length,
    changes: changes
  };

  fs.writeFileSync('image-paths-fix-record.json', JSON.stringify(record, null, 2));
  console.log(`\n📝 修复记录已保存到: image-paths-fix-record.json`);

  console.log(`\n💡 下一步:`);
  console.log(`  1. 重新构建网站: npm run build:ssg`);
  console.log(`  2. 检查Related Tools图片显示`);
  console.log(`  3. 推送到GitHub: git add . && git commit -m "修复所有工具图片路径" && git push`);
} else {
  console.log(`\n❌ 没有需要修复的工具`);
}

console.log(`\n✅ Image路径修复完成！`);