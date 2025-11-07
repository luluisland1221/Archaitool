import { configuredCategories } from '../data/tools';
import { generateToolUrl } from '../utils/urlHelper';

// 生成所有工具详情页面的路由
export function generateToolRoutes() {
  const routes: string[] = [];

  // 添加静态路由
  routes.push('/', '/tools');

  // 添加分类页面路由
  configuredCategories.forEach(category => {
    routes.push(`/tools/${category.id}`);

    // 添加工具详情页面路由
    category.subcategories.forEach(subcategory => {
      subcategory.tools.forEach(tool => {
        const toolUrl = generateToolUrl(tool.id);
        routes.push(toolUrl);
      });
    });
  });

  return routes;
}

// 生成用于sitemap的URL列表
export function generateSitemapUrls() {
  const urls: Array<{url: string, priority: number, changefreq: string}> = [];

  // 首页
  urls.push({ url: '/', priority: 1.0, changefreq: 'weekly' });

  // 主工具页面
  urls.push({ url: '/tools', priority: 0.9, changefreq: 'weekly' });

  // 分类页面
  configuredCategories.forEach(category => {
    urls.push({
      url: `/tools/${category.id}`,
      priority: 0.8,
      changefreq: 'weekly'
    });
  });

  // 工具详情页面
  configuredCategories.forEach(category => {
    category.subcategories.forEach(subcategory => {
      subcategory.tools.forEach(tool => {
        const toolUrl = generateToolUrl(tool.id);
        urls.push({
          url: toolUrl,
          priority: 0.7,
          changefreq: 'monthly'
        });
      });
    });
  });

  return urls;
}

// 获取总页面数统计
export function getPageStats() {
  const totalPages = 2 + configuredCategories.length + // 首页 + 工具页 + 分类页
    configuredCategories.reduce((total, category) => {
      return total + category.subcategories.reduce((subTotal, subcategory) => {
        return subTotal + subcategory.tools.length;
      }, 0);
    }, 0);

  return {
    homepage: 1,
    toolsPage: 1,
    categoryPages: configuredCategories.length,
    toolPages: configuredCategories.reduce((total, category) => {
      return total + category.subcategories.reduce((subTotal, subcategory) => {
        return subTotal + subcategory.tools.length;
      }, 0);
    }, 0),
    total: totalPages
  };
}