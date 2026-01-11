import fs from "fs";

const urls = [
  "https://archaitool.com/",
  "https://archaitool.com/tools",
  "https://archaitool.com/tools/architecture-spatial",
  "https://archaitool.com/tools/interior-design",
  "https://archaitool.com/tools/landscape-design",
  "https://archaitool.com/tools/general-design",
  "https://archaitool.com/tools/real-estate",
  "https://archaitool.com/about",
  "https://archaitool.com/contact",
  "https://archaitool.com/privacy-policy",
  "https://archaitool.com/terms-of-service",
  "https://archaitool.com/blog",
  "https://archaitool.com/blog/architects-guide-to-ai-5-step-beginner-guide-2025",
  "https://archaitool.com/blog/top-10-ai-tools-every-architect-should-know-2025",
  "https://archaitool.com/tools/architecture-spatial/architectural-design",
  "https://archaitool.com/tools/architecture-spatial/architectural-visualization",
  "https://archaitool.com/tools/architecture-spatial",
  "https://archaitool.com/tools/interior-design/interior-design-remodeling",
  "https://archaitool.com/tools/interior-design/virtual-staging",
  "https://archaitool.com/tools/landscape-design/landscape-planning",
  "https://archaitool.com/tools/landscape-design",
  "https://archaitool.com/tools/general-design/design-automation",
  "https://archaitool.com/tools/general-design/multi-domain-ai",
  "https://archaitool.com/tools/general-design",
  "https://archaitool.com/tools/real-estate/property-visualization",
  "https://archaitool.com/tools/real-estate",
  "https://archaitool.com/interior-design/indesignify",
  "https://archaitool.com/interior-design/instantdeco-ai",
  "https://archaitool.com/architectural-design/floorplan-ai",
  "https://archaitool.com/architectural-design/architechtures",
  "https://archaitool.com/real-estate/iacrea",
  "https://archaitool.com/design-tools/rustic-ai",
  "https://archaitool.com/interior-design/arch-e-ai",
  "https://archaitool.com/interior-design/home-design-ai",
  "https://archaitool.com/architectural-design/airender-studio",
  "https://archaitool.com/architectural-design/chaos",
  "https://archaitool.com/landscape-design/yardflip",
  "https://archaitool.com/architectural-design/arkdesign-ai",
  "https://archaitool.com/interior-design/gepettoapp",
  "https://archaitool.com/design-tools/draftaid",
  "https://archaitool.com/architectural-design/d5-render",
  "https://archaitool.com/interior-design/renovate-ai",
  "https://archaitool.com/real-estate/reimaginehome",
  "https://archaitool.com/interior-design/madespace",
  "https://archaitool.com/architectural-design/ai-architectures",
  "https://archaitool.com/architectural-design/3d-house-planner",
  "https://archaitool.com/architectural-design/arcadium-3d",
  "https://archaitool.com/design-tools/openai-dalle",
  "https://archaitool.com/architectural-design/arko-ai",
  "https://archaitool.com/interior-design/designai",
  "https://archaitool.com/real-estate/collov",
  "https://archaitool.com/architectural-design/rendera-ai",
  "https://archaitool.com/interior-design/renovateai",
  "https://archaitool.com/landscape-design/ai-garden-design",
  "https://archaitool.com/interior-design/decorion",
  "https://archaitool.com/landscape-design/dreamzar",
  "https://archaitool.com/architectural-design/autodesk-forma",
  "https://archaitool.com/architectural-design/myarchitectai",
  "https://archaitool.com/design-tools/midjourney",
  "https://archaitool.com/interior-design/artevia",
  "https://archaitool.com/interior-design/archi-ai",
  "https://archaitool.com/landscape-design/landscapedesignsai",
  "https://archaitool.com/interior-design/decoratly",
  "https://archaitool.com/interior-design/palette-immo",
  "https://archaitool.com/architectural-design/maket-ai",
  "https://archaitool.com/design-tools/adobe-firefly",
  "https://archaitool.com/architectural-design/testfit",
  "https://archaitool.com/architectural-design/aitwo",
  "https://archaitool.com/architectural-design/lumion",
  "https://archaitool.com/architectural-design/archsynth",
  "https://archaitool.com/real-estate/aihomedesign",
  "https://archaitool.com/architectural-design/visoid",
  "https://archaitool.com/interior-design/floordesign-ai",
  "https://archaitool.com/interior-design/paintit-ai",
  "https://archaitool.com/design-tools/sketchpro-ai",
  "https://archaitool.com/interior-design/ai4spaces",
  "https://archaitool.com/design-tools/opal-ai",
  "https://archaitool.com/interior-design/sofabrain",
  "https://archaitool.com/architectural-design/bricsys",
  "https://archaitool.com/architectural-design/evolvelab-veras",
  "https://archaitool.com/architectural-design/visualizee-ai",
  "https://archaitool.com/interior-design/vibe3d",
  "https://archaitool.com/interior-design/roomgpt",
  "https://archaitool.com/design-tools/moodboardai"
];

const typeMap = (url) => {
  if (url === "https://archaitool.com/") return "Home";
  if (url.startsWith("https://archaitool.com/blog")) {
    return url === "https://archaitool.com/blog" ? "Blog Listing" : "Blog Post";
  }
  if (url.includes("/tools")) {
    if (/\/tools\/[a-z-]+\/[a-z-]+/i.test(url)) return "Subcategory Page";
    if (/\/tools\/[a-z-]+$/i.test(url)) return "Category Page";
    return "Tools Listing";
  }
  if (url.endsWith("/about") || url.endsWith("/contact") || url.includes("privacy") || url.includes("terms")) {
    return "Static Page";
  }
  return "Tool Detail";
};

const stripHtml = (html) => {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<!--([\s\S]*?)-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const results = [];

for (const url of urls) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });
    const html = await res.text();
    const text = stripHtml(html);
    results.push({
      url,
      status: res.status,
      type: typeMap(url),
      characters: text.length,
      words: text ? text.split(/\s+/).length : 0
    });
  } catch (error) {
    results.push({
      url,
      status: "error",
      type: typeMap(url),
      characters: 0,
      words: 0,
      error: error.message
    });
  }
}

results.sort((a, b) => a.characters - b.characters);

const lines = ["| # | Page Type | URL | Status | Characters | Words |", "| - | --------- | --- | ------ | ---------- | ----- |"];
results.forEach((result, index) => {
  lines.push(`| ${index + 1} | ${result.type} | ${result.url} | ${result.status} | ${result.characters} | ${result.words} |`);
});

if (!fs.existsSync("reports")) {
  fs.mkdirSync("reports");
}

fs.writeFileSync("reports/wordcount-report.md", lines.join("\n"), "utf-8");
console.log("Saved reports/wordcount-report.md with", results.length, "entries");
