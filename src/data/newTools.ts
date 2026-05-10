export const newToolIds = [
  'consistent-character-ai',
  'deepseek-v4-network',
  'kling-o1',
  'seedance-2',
  'video-prompt-generator',
  'nemotron-3-online',
  'veo-3-1-lite',
  'gpt-image-2',
  'ai-architectures',
  'vibe3d',
  '3d-house-planner',
  'floor-plan-ai',
  'floordesign-ai',
  'home-design-ai',
  'dehome-ai',
  'roomlab-app',
  'ai-renovation',
  'rendera-ai',
  'renovate-ai',
  'artevia',
  'madespace',
  'rustic-ai',
  'ai-garden-design',
  'landscapingai',
  'arcadium3d',
  'nano-banana-pro',
  'flux-2',
  'archfine-ai',
  'rendair-ai',
  'lookx',
  'sketchup-diffusion'
];

export const featuredNewToolIds = [
  'consistent-character-ai',
  'deepseek-v4-network',
  'kling-o1',
  'seedance-2',
  'video-prompt-generator',
  'nemotron-3-online',
  'veo-3-1-lite',
  'gpt-image-2',
  'nano-banana-pro',
  'flux-2',
  'archfine-ai',
  'rendair-ai',
  'lookx',
  'sketchup-diffusion'
];

export const isNewToolId = (toolId?: string | null) =>
  Boolean(toolId && newToolIds.includes(toolId));

export const getFeaturedNewToolRank = (toolId: string) => {
  const rank = featuredNewToolIds.indexOf(toolId);
  return rank === -1 ? Number.MAX_SAFE_INTEGER : rank;
};
