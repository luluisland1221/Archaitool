// Static screenshot mapping - Use when API quota exhausted
export const FALLBACK_SCREENSHOTS: Record<string, string> = {
  // Architecture & Spatial Design
  'aitwo.co': '/screenshots/aitwo_co_.png',
  'www.maket.ai': '/screenshots/maket_ai_.png',
  'arkdesign.ai': '/screenshots/arkdesign_ai_.png',
  'architechtures.com': '/screenshots/architechtures_com_en.png',
  'forma.autodesk.com': '/screenshots/autodesk forma.png',
  'testfit.io': '/screenshots/testfit_.png',
  'myarchitectai.com': '/screenshots/myarchitectai_.png',
  'visualizee.ai': '/screenshots/visualizee-ai.png',
  'arko.ai': '/screenshots/arko_ai_.png',
  'evolvelab-veras.com': '/screenshots/evolvelab_veras.png',
  'airender.studio': '/screenshots/airender_studio_.png',
  'visoid.com': '/screenshots/www_visoid_com_.png',
  'd5-render.com': '/screenshots/dall-e-3.png',
  'chaos.group': '/screenshots/chaos.png',

  // Interior Design
  'ainterior.design': '/screenshots/ainterior_design_.png',
  'arch-e.ai': '/screenshots/arch_e_ai_.png',
  'archi.ai': '/screenshots/archi_ai_.png',
  'ai4spaces.com': '/screenshots/ai4spaces_com_.png',
  'roomgpt.io': '/screenshots/dall-e-3.png',
  'palette.immo': '/screenshots/palette_immo_.png',
  'sofabrain.ai': '/screenshots/sofabrain.png',

  // Landscape Design
  'landscapedesignsai.com': '/screenshots/landscapedesignsai.png',
  'www.yardflip.ai': '/screenshots/www_yardflip_ai_.png',

  // General Design
  'midjourney.com': '/screenshots/midjourney.png',
  'openai.com': '/screenshots/dall-e-3.png',
  'helpx.adobe.com': '/screenshots/dall-e-3.png',

  // Real Estate
  'collov.ai': '/screenshots/collov ai.png',
  'www.reimaginehome.ai': '/screenshots/www_reimaginehome_ai_.webp',
  'aihomedesign.com': '/screenshots/aihomedesign_com_.png'
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