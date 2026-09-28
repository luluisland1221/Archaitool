export const newToolIds = [
  'minimax-m3-online',
  'glm-5-2',
  'longcat-2-0',
  'kimi-k3',
  'minimax-h3',
  'glm-5-3',
  'h3-max',
  'hy-4'
];

export const featuredNewToolIds = [...newToolIds];

export const isNewToolId = (toolId?: string | null) =>
  Boolean(toolId && newToolIds.includes(toolId));

export const getFeaturedNewToolRank = (toolId: string) => {
  const featuredRank = featuredNewToolIds.indexOf(toolId);
  if (featuredRank !== -1) {
    return featuredRank;
  }

  const newRank = newToolIds.indexOf(toolId);
  return newRank === -1
    ? Number.MAX_SAFE_INTEGER
    : featuredNewToolIds.length + newRank;
};
