import fs from "fs";
import puppeteer from "puppeteer";

const urls = JSON.parse(fs.readFileSync("scripts/wordcount-urls.json", "utf-8"));

const classify = (url) => {
  if (url === "https://archaitool.com/") return "Home";
  if (url.includes("/blog")) {
    return url === "https://archaitool.com/blog" ? "Blog Listing" : "Blog Post";
  }
  if (url.includes("/tools")) {
    if (/\/tools\/[a-z-]+\/[a-z-]+/.test(url)) return "Subcategory";
    if (/\/tools\/[a-z-]+$/.test(url)) return "Category";
    return "Tools Listing";
  }
  if (url.includes("/privacy") || url.includes("/terms") || url.includes("/contact") || url.includes("/about")) return "Static";
  return "Tool Detail";
};

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
const results = [];

for (const [index, url] of urls.entries()) {
  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    const text = await page.evaluate(() => document.body.innerText || "");
    const trimmed = text.replace(/\s+/g, " ").trim();
    results.push({
      url,
      order: index + 1,
      type: classify(url),
      characters: trimmed.length,
      words: trimmed ? trimmed.split(/\s+/).length : 0
    });
    console.log(`Processed ${url} => ${trimmed.length} chars`);
  } catch (error) {
    console.error("Failed", url, error.message);
    results.push({ url, order: index + 1, type: classify(url), characters: 0, words: 0, error: error.message });
  }
}

await browser.close();

results.sort((a, b) => a.characters - b.characters);

const lines = ["| # | Type | URL | Characters | Words | Notes |", "| - | ---- | --- | ---------- | ----- | ----- |"];
for (const [idx, item] of results.entries()) {
  lines.push(`| ${idx + 1} | ${item.type} | ${item.url} | ${item.characters} | ${item.words} | ${item.error ? item.error : ""} |`);
}

if (!fs.existsSync("reports")) fs.mkdirSync("reports");
fs.writeFileSync("reports/wordcount-browser-report.md", lines.join("\n"));
console.log("Report saved to reports/wordcount-browser-report.md");
