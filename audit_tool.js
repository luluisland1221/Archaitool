const fs = require("fs");
const content = fs.readFileSync("G:\ai编程\100个网站\02 建筑生图工具导航站\bolt new\project\src\data\tools.ts", "utf8");
const idMatches = content.match(/id:\s*[""]([^""]+)[""]/g) || [];
const ids = idMatches.map(match => match.match(/id:\s*[""]([^""]+)[""]/)[1]);
const duplicates = [];
const uniqueIds = new Set();
ids.forEach(id => {
