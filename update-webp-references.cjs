#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// WebP文件映射
const WEBP_MAPPING = {
  'PromeAl.png': 'PromeAl.webp',
  'ai4spaces_com_.png': 'ai4spaces_com_.webp',
  'aihomedesign_com_.png': 'aihomedesign_com_.webp',
  'ainterior_design_.png': 'ainterior_design_.webp',
  'airender_studio.png': 'airender_studio.webp',
  'aitwo_co_.png': 'aitwo_co_.webp',
  'arch_e_ai_.png': 'arch_e_ai_.webp',
  'archi_ai_.png': 'archi_ai_.webp',
  'architechtures_com_en.png': 'architechtures_com_en.webp',
  'architectai_app_.png': 'architectai_app_.webp',
  'archonet.co.png': 'archonet.co.webp',
  'arkdesign_ai_.png': 'arkdesign_ai_.webp',
  'arko_ai_.png': 'arko_ai_.webp',
  'autodesk forma.png': 'autodesk forma.webp',
  'chaos.png': 'chaos.webp',
  'collov ai.png': 'collov ai.webp',
  'd5next.ai.png': 'd5next.ai.webp',
  'dall-e-3.png': 'dall-e-3.webp',
  'decorai_xyz_.png': 'decorai_xyz_.webp',
  'decorion_xyz_.png': 'decorion_xyz_.webp',
  'designedbyai_io_.png': 'designedbyai_io_.webp',
  'designera_app_.png': 'designera_app_.webp',
  'draftaid_io_.png': 'draftaid_io_.webp',
  'gepettoapp_com_.png': 'gepettoapp_com_.webp',
  'graphisoft_com_solutions_innovation_archicad_ai_vi.png': 'graphisoft_com_solutions_innovation_archicad_ai_vi.webp',
  'helpx.adobe.png': 'helpx.adobe.webp',
  'image.png': 'image.webp',
  'indesignify_com_.png': 'indesignify_com_.webp',
  'instantdeco_ai_.png': 'instantdeco_ai_.webp',
  'kitchengpt_io_.png': 'kitchengpt_io_.webp',
  'landscapedesignsai_com_.png': 'landscapedesignsai_com_.webp',
  'lumion_com_.png': 'lumion_com_.webp',
  'luw_ai_.png': 'luw_ai_.webp',
  'maket.ai.png': 'maket.ai.webp',
  'midjourney.png': 'midjourney.webp',
  'mnml_ai_.png': 'mnml_ai_.webp',
  'moodboardai_com_.png': 'moodboardai_com_.webp',
  'myarchitectai_com_.png': 'myarchitectai_com_.webp',
  'paintit_ai_.png': 'paintit_ai_.webp',
  'palette_immo_.png': 'palette_immo_.webp',
  'renderai_app_.png': 'renderai_app_.webp',
  'renovateai_app_.png': 'renovateai_app_.webp',
  'roomai_com_.png': 'roomai_com_.webp',
  'sketchpro_ai_.png': 'sketchpro_ai_.webp',
  'sofabrain_com_.png': 'sofabrain_com_.webp',
  'visualizee_ai_.png': 'visualizee_ai_.webp',
  'vsdeco_com_.png': 'vsdeco_com_.webp',
  'www_aihouse_com_.png': 'www_aihouse_com_.webp',
  'www_architectgpt_io_.png': 'www_architectgpt_io_.webp',
  'www_archivinci_com_.png': 'www_archivinci_com_.webp',
  'www_archsynth_com_.png': 'www_archsynth_com_.webp',
  'www_bricsys_com_en_eu_bricscad_bim.png': 'www_bricsys_com_en_eu_bricscad_bim.webp',
  'www_d5render_com_.png': 'www_d5render_com_.webp',
  'www_decoratly_com_.png': 'www_decoratly_com_.webp',
  'www_designai_us_.png': 'www_designai_us_.webp',
  'www_designifyai_io_.png': 'www_designifyai_io_.webp',
  'www_designsense_ai_.png': 'www_designsense_ai_.webp',
  'www_dreamzar_app_.png': 'www_dreamzar_app_.webp',
  'www_evolvelab_io_veras.png': 'www_evolvelab_io_veras.webp',
  'www_floorplan_ai_com_.png': 'www_floorplan_ai_com_.webp',
  'www_homegpt_app_.png': 'www_homegpt_app_.webp',
  'www_homevisualizer_ai_.png': 'www_homevisualizer_ai_.webp',
  'www_iacrea_com_.png': 'www_iacrea_com_.webp',
  'www_indesignify_com_.png': 'www_indesignify_com_.webp',
  'www_lookx_ai_.png': 'www_lookx_ai_.webp',
  'www_maket_ai_.png': 'www_maket_ai_.webp',
  'www_opal_ai_com_.png': 'www_opal_ai_com_.webp',
  'www_reimaginehome_ai_.png': 'www_reimaginehome_ai_.webp',
  'www_roomdeco_ai_.png': 'www_roomdeco_ai_.webp',
  'www_roomdesigner_ai_.png': 'www_roomdesigner_ai_.webp',
  'www_roomgpt_io_.png': 'www_roomgpt_io_.webp',
  'www_spacely_ai_tools.png': 'www_spacely_ai_tools.webp',
  'www_spatiastudio_com_.png': 'www_spatiastudio_com_.webp',
  'www_testfit_io_product_real_time_ai.png': 'www_testfit_io_product_real_time_ai.webp',
  'www_visoid_com_.png': 'www_visoid_com_.webp',
  'www_yardflip_ai_.png': 'www_yardflip_ai_.webp',
  'www_zoyo_ai_.png': 'www_zoyo_ai_.webp'
};

function updateToolsData() {
  const toolsFile = 'src/data/tools.ts';

  if (!fs.existsSync(toolsFile)) {
    console.error('❌ tools.ts文件不存在');
    return false;
  }

  let content = fs.readFileSync(toolsFile, 'utf8');
  let updated = false;

  // 替换所有的PNG文件名为WebP文件名
  Object.entries(WEBP_MAPPING).forEach(([pngFile, webpFile]) => {
    const pngPath = `/screenshots/${pngFile}`;
    const webpPath = `/screenshots/${webpFile}`;

    if (content.includes(pngPath)) {
      content = content.replace(new RegExp(pngPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), webpPath);
      console.log(`✅ 更新 ${pngFile} → ${webpFile}`);
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(toolsFile, content);
    console.log('✅ 工具数据已更新为WebP格式');
    return true;
  } else {
    console.log('⚠️  没有找到需要更新的PNG引用');
    return false;
  }
}

function main() {
  console.log('🔄 更新工具数据引用为WebP格式...\n');

  const success = updateToolsData();

  if (success) {
    console.log('\n✅ WebP引用更新完成！');
    console.log('\n📋 下一步操作:');
    console.log('1. 确保所有PNG文件已转换为WebP');
    console.log('2. 验证WebP文件在public/screenshots-webp/目录');
    console.log('3. 运行git add和git commit');
    console.log('4. 推送到GitHub');
  } else {
    console.log('\n❌ WebP引用更新失败');
  }
}

main();