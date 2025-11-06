// Static screenshot mapping - Use when API quota exhausted
export const FALLBACK_SCREENSHOTS: Record<string, string> = {
  // Architecture & Spatial Design
  'aitwo.co': '/screenshots/aitwo_co_.webp',
  'www.maket.ai': '/screenshots/www_maket_ai_.webp',
  'arkdesign.ai': '/screenshots/arkdesign_ai_.webp',
  'architechtures.com': '/screenshots/architechtures_com_en.webp',
  'forma.autodesk.com': '/screenshots/autodesk forma.png',
  'testfit.io': '/screenshots/www_testfit_io_product_real_time_ai.png',
  'myarchitectai.com': '/screenshots/myarchitectai_com_.webp',
  'visualizee.ai': '/screenshots/visualizee_ai_.webp',
  'arko.ai': '/screenshots/arko_ai_.webp',
  'evolvelab-veras.com': '/screenshots/www_evolvelab_io_veras.webp',
  'airender.studio': '/screenshots/airender_studio__enhanced.webp',
  'visoid.com': '/screenshots/www_visoid_com_.webp',
  'd5-render.com': '/screenshots/dall-e-3.png',
  'chaos.group': '/screenshots/chaos.webp',

  // Interior Design
  'ainterior.design': '/screenshots/ainterior_design_.webp',
  'arch-e.ai': '/screenshots/arch_e_ai_.webp',
  'archi.ai': '/screenshots/archi_ai__enhanced.webp',
  'ai4spaces.com': '/screenshots/ai4spaces_com_.webp',
  'roomgpt.io': '/screenshots/dall-e-3.png',
  'palette.immo': '/screenshots/palette_immo_.webp',
  'sofabrain.ai': '/screenshots/sofabrain_com_.webp',

  // Landscape Design
  'landscapedesignsai.com': '/screenshots/landscapedesignsai_com_.webp',
  'www.yardflip.ai': '/screenshots/www_yardflip_ai_.webp',

  // General Design
  'midjourney.com': '/screenshots/midjourney.webp',
  'openai.com': '/screenshots/dall-e-3.png',
  'helpx.adobe.com': '/screenshots/dall-e-3.png',

  // Real Estate
  'collov.ai': '/screenshots/collov ai.webp',
  'www.reimaginehome.ai': '/screenshots/www_reimaginehome_ai_.webp',
  'aihomedesign.com': '/screenshots/aihomedesign_com_.webp'
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