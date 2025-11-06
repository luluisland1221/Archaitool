// Static screenshot mapping - Use when API quota exhausted
export const FALLBACK_SCREENSHOTS: Record<string, string> = {
  // Architecture & Spatial Design
  'aitwo.co': '/screenshots/aitwo_co_.webp',
  'maket.ai': '/screenshots/maket.ai.webp',
  'www.maket.ai': '/screenshots/www_maket_ai_.webp',
  'arkdesign.ai': '/screenshots/arkdesign_ai_.webp',
  'architechtures.com': '/screenshots/architechtures_com_en.webp',
  'forma.autodesk.com': '/screenshots/autodesk forma.webp',
  'testfit.io': '/screenshots/www_testfit_io_product_real_time_ai.webp',
  'myarchitectai.com': '/screenshots/myarchitectai_com_.webp',
  'visualizee.ai': '/screenshots/visualizee_ai_.webp',
  'arko.ai': '/screenshots/arko_ai_.webp',
  'evolvelab-veras.com': '/screenshots/www_evolvelab_io_veras.webp',
  'airender.studio': '/screenshots/airender_studio_.webp',
  'visoid.com': '/screenshots/www_visoid_com_.webp',
  'd5-render.com': '/screenshots/dall-e-3.webp',
  'd5next.ai': '/screenshots/d5next.ai.webp',
  'chaos.group': '/screenshots/chaos.webp',

  // Interior Design
  'ainterior.design': '/screenshots/ainterior_design_.webp',
  'arch-e.ai': '/screenshots/arch_e_ai_.webp',
  'archi.ai': '/screenshots/archi_ai_.webp',
  'ai4spaces.com': '/screenshots/ai4spaces_com_.webp',
  'roomgpt.io': '/screenshots/www_roomgpt_io_.webp',
  'palette.immo': '/screenshots/palette_immo_.webp',
  'sofabrain.ai': '/screenshots/sofabrain_com_.webp',
  'collov.ai': '/screenshots/collov ai.webp',
  'reimaginehome.ai': '/screenshots/www_reimaginehome_ai_.webp',
  'www.reimaginehome.ai': '/screenshots/www_reimaginehome_ai_.webp',
  'aihomedesign.com': '/screenshots/aihomedesign_com_.webp',

  // Landscape Design
  'landscapedesignsai.com': '/screenshots/landscapedesignsai_com_.webp',
  'yardflip.ai': '/screenshots/www_yardflip_ai_.webp',
  'www.yardflip.ai': '/screenshots/www_yardflip_ai_.webp',

  // General Design
  'midjourney.com': '/screenshots/midjourney.webp',
  'openai.com': '/screenshots/dall-e-3.webp',
  'helpx.adobe.com': '/screenshots/helpx.adobe.webp',

  // Real Estate (already covered above)

  // Additional tools that need mapping
  'architectgpt.io': '/screenshots/www_architectgpt_io_.webp',
  'archivinci.com': '/screenshots/www_archivinci_com_.webp',
  'archsynth.com': '/screenshots/www_archsynth_com_.webp',
  'bricsys.com': '/screenshots/www_bricsys_com_en_eu_bricscad_bim.webp',
  'd5render.com': '/screenshots/www_d5render_com_.webp',
  'decoratly.com': '/screenshots/www_decoratly_com_.webp',
  'designai.us': '/screenshots/www_designai_us_.webp',
  'designifyai.io': '/screenshots/www_designifyai_io_.webp',
  'designsense.ai': '/screenshots/www_designsense_ai_.webp',
  'dreamzar.app': '/screenshots/www_dreamzar_app_.webp',
  'floorplan.ai': '/screenshots/www_floorplan_ai_com_.webp',
  'homegpt.app': '/screenshots/www_homegpt_app_.webp',
  'homevisualizer.ai': '/screenshots/www_homevisualizer_ai_.webp',
  'iacrea.com': '/screenshots/www_iacrea_com_.webp',
  'lookx.ai': '/screenshots/www_lookx_ai_.webp',
  'opal.ai': '/screenshots/www_opal_ai_com_.webp',
  'roomdeco.ai': '/screenshots/www_roomdeco_ai_.webp',
  'roomdesigner.ai': '/screenshots/www_roomdesigner_ai_.webp',
  'roomgpt.io': '/screenshots/www_roomgpt_io_.webp',
  'spacely.ai': '/screenshots/www_spacely_ai_tools.webp',
  'spatiastudio.com': '/screenshots/www_spatiastudio_com_.webp',
  'zoyo.ai': '/screenshots/www_zoyo_ai_.webp',
  'aihouse.com': '/screenshots/www_aihouse_com_.webp'
};

/**
 * 获取工具的静态备用截图
 */
export function getFallbackScreenshotUrl(toolUrl: string): string | null {
  try {
    const url = new URL(toolUrl);
    const domain = url.hostname.replace(/^www\./, '');
    const hostname = url.hostname;

    // Try both with and without www
    return FALLBACK_SCREENSHOTS[domain] || FALLBACK_SCREENSHOTS[hostname] || null;
  } catch {
    return null;
  }
}

/**
 * 获取通用的占位图
 */
export function getPlaceholderImageUrl(): string {
  const colors = ['667eea', '764ba2', 'f093fb', 'f5576c', '4facfe', '00f2fe'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return `https://via.placeholder.com/800x530/${randomColor}/ffffff?text=AI+Tool`;
}