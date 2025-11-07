// Suggested fixes for fallbackScreenshots.ts

// MAPPINGS TO ADD (27 new mappings needed):
const mappingsToAdd = {
  // Architecture & Spatial Design - Missing mappings
  '3dhouseplanner.com': '/screenshots/3dhouseplanner_com.webp',
  'ai-architectures.com': '/screenshots/ai-architectures_com.webp',
  'arcadium3d.com': '/screenshots/arcadium3d_com.webp',
  'draftaid.io': '/screenshots/draftaid_io.webp',
  'lumion.com': '/screenshots/lumion_com.webp',
  'sketchpro.ai': '/screenshots/sketchpro_ai.webp',

  // Interior Design - Missing mappings
  'artevia.ai': '/screenshots/artevia_ai.webp',
  'decorion.xyz': '/screenshots/decorion_xyz.webp',
  'floordesign.ai': '/screenshots/floordesign_ai.webp',
  'home-design.ai': '/screenshots/home-design_ai.webp',
  'indesignify.com': '/screenshots/indesignify_com.webp',
  'instantdeco.ai': '/screenshots/instantdeco_ai.webp',
  'madespace.ai': '/screenshots/madespace_ai.webp',
  'paintit.ai': '/screenshots/paintit_ai.webp',
  'vibe3d.ai': '/screenshots/vibe3d_ai.webp',

  // Landscape Design - Missing mappings
  'aigardendesign.io': '/screenshots/aigardendesign_io.webp',

  // General Design - Missing mappings
  'moodboardai.com': '/screenshots/moodboardai_com.webp',
  'gepettoapp.com': '/screenshots/gepettoapp_com.webp',

  // Real Estate - Missing mappings
  'renovateai.app': '/screenshots/renovateai_app.webp',

  // Tools needing www subdomain handling
  'chaos.com': '/screenshots/chaos_com.webp',
  'evolvelab.io': '/screenshots/evolvelab_io.webp',
  'floorplan-ai.com': '/screenshots/floorplan-ai_com.webp',
  'opal-ai.com': '/screenshots/opal-ai_com.webp',
  'rendera.ai': '/screenshots/rendera_ai.webp',
  'renovateai.ai': '/screenshots/renovateai_ai.webp',
  'rusticai.art': '/screenshots/rusticai_art.webp',

  // Domain mapping fixes
  'sofabrain.com': '/screenshots/sofabrain_com_.webp' // Currently mapped as sofabrain.ai
};

// MAPPINGS TO REMOVE (22 unused mappings):
const mappingsToRemove = [
  'forma.autodesk.com',  // Should use autodesk.com mapping
  'evolvelab-veras.com', // Wrong domain - should be evolvelab.io
  'd5-render.com',      // Wrong domain - should be d5render.com
  'd5next.ai',          // Not in tools.ts
  'chaos.group',        // Should use chaos.com mapping
  'ainterior.design',   // Not in tools.ts
  'sofabrain.ai',       // Wrong domain - should be sofabrain.com
  'architectgpt.io',    // Not in tools.ts
  'archivinci.com',     // Not in tools.ts
  'designifyai.io',     // Not in tools.ts
  'designsense.ai',     // Not in tools.ts
  'floorplan.ai',       // Wrong domain - should be floorplan-ai.com
  'homegpt.app',        // Not in tools.ts
  'homevisualizer.ai',  // Not in tools.ts
  'lookx.ai',          // Not in tools.ts
  'opal.ai',           // Wrong domain - should be opal-ai.com
  'roomdeco.ai',       // Not in tools.ts
  'roomdesigner.ai',   // Not in tools.ts
  'spacely.ai',        // Not in tools.ts
  'spatiastudio.com',  // Not in tools.ts
  'zoyo.ai',           // Not in tools.ts
  'aihouse.com'        // Not in tools.ts
];

// DOMAIN MAPPING CONFLICTS TO FIX:
const domainConflicts = [
  {
    issue: "sofabrain.com vs sofabrain.ai",
    toolUrl: "https://sofabrain.com/",
    currentMapping: "sofabrain.ai",
    correctMapping: "sofabrain.com"
  },
  {
    issue: "www.chaos.com vs chaos.group",
    toolUrl: "https://www.chaos.com/",
    currentMapping: "chaos.group",
    correctMapping: "chaos.com"
  },
  {
    issue: "www.evolvelab.io vs evolvelab-veras.com",
    toolUrl: "https://www.evolvelab.io/veras",
    currentMapping: "evolvelab-veras.com",
    correctMapping: "evolvelab.io"
  },
  {
    issue: "www.opal-ai.com vs opal.ai",
    toolUrl: "https://www.opal-ai.com/",
    currentMapping: "opal.ai",
    correctMapping: "opal-ai.com"
  }
];