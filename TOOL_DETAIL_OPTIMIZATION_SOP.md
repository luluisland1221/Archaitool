# 工具详情页数据收集与优化SOP

## 📋 概述
标准化流程用于收集工具官网真实信息并优化详情页展示效果

## 🎯 目标
- 收集工具真实、详细的信息
- 提升详情页的专业性和用户体验
- 确保信息准确性和一致性

## 🔧 技术基础架构

### 1. 数据结构扩展
```typescript
interface Tool {
  // 基础信息
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  category: string;
  subcategory: string;

  // 扩展信息（需要收集）
  detailedDescription?: string;
  userRating?: number;
  reviewCount?: number;
  isPaid?: boolean;
  pricing?: {
    free?: boolean;
    freeTrial?: boolean;
    subscription?: boolean;
    oneTimePayment?: boolean;
    custom?: string[];
  };
  features?: string[];
  keyFeatures?: string[];
  useCases?: string[];
  targetAudience?: string[];
  integrations?: string[];
  platforms?: string[];
  languages?: string[];
  support?: {
    email?: boolean;
    chat?: boolean;
    phone?: boolean;
    faq?: boolean;
    documentation?: boolean;
    community?: boolean;
  };
  api?: boolean;
  mobileApp?: boolean;
  cloudBased?: boolean;
  openSource?: boolean;
  enterpriseReady?: boolean;
  learningCurve?: 'Beginner' | 'Intermediate' | 'Advanced';
  company?: {
    name?: string;
    founded?: number;
    headquarters?: string;
    teamSize?: string;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
  lastUpdated?: string;
  tags?: string[];
}
```

### 2. 智能数据处理系统
- **数据质量评估**：自动评估信息完整度
- **回退机制**：缺失信息的智能填充
- **研究模板生成**：标准化信息收集

## 📝 信息收集流程

### 阶段1：前期准备
1. **工具识别**
   - 工具名称和官网URL
   - 所属类别和子类别
   - 当前已有信息评估

2. **研究计划制定**
   - 使用 `src/utils/toolResearcher.ts` 生成研究计划
   - 确定信息收集优先级
   - 准备搜索关键词

### 阶段2：官网信息收集
1. **主要页面访问**
   - 首页：核心价值主张和功能介绍
   - 定价页面：详细的价格结构
   - 功能页面：完整功能列表
   - 关于页面：公司背景信息
   - 帮助/文档页面：技术细节

2. **关键信息提取**
   ```typescript
   // 必需信息
   - 详细描述（1-2段）
   - 定价信息（免费/付费/试用）
   - 主要功能（5-10个核心功能）
   - 支持平台（Web/移动端/桌面）
   - 目标用户群体

   // 可选信息
   - 用户评价和评分
   - 公司信息（成立时间、规模等）
   - 集成能力
   - API支持
   - 学习曲线难度
   ```

### 阶段3：搜索补充信息
1. **搜索引擎查询**
   - `"[工具名] features"`
   - `"[工具名] pricing"`
   - `"[工具名] reviews"`
   - `"[工具名] alternatives"`
   - `"[工具名] use cases"`

2. **第三方平台信息**
   - G2、Capterra等评测网站
   - YouTube演示视频
   - 技术博客和论坛讨论
   - 社交媒体官方账号

### 阶段4：数据整理与验证
1. **信息验证**
   - 确保信息来源可靠
   - 交叉验证关键数据
   - 标记信息置信度

2. **数据标准化**
   - 功能列表标准化
   - 定价信息格式化
   - 描述文本优化

## 🛠️ 技术实施步骤

### 1. 数据收集工具使用
```bash
# 使用研究工具
node src/utils/toolResearcher.js --tool-id "maket-ai"
```

### 2. 信息更新流程
```typescript
// 1. 更新工具数据
src/data/tools.ts
├── 找到对应工具
├── 添加收集到的信息
└── 确保数据格式正确

// 2. 验证数据质量
src/utils/toolDataUtils.ts
├── 调用 evaluateDataQuality()
├── 检查信息完整度
└── 生成优化建议

// 3. 测试页面显示
npm run dev
├── 访问工具详情页
├── 验证信息显示正确
└── 检查响应式布局
```

### 3. 质量控制清单（灵活检查）

#### 基础验证（必须确保）
- [ ] **描述准确性**：与官网信息一致，无夸大或误导
- [ ] **定价真实性**：反映实际收费模式，不虚构价格
- [ ] **功能核实**：列出的功能确实存在且可用
- [ ] **链接有效性**：官网链接正常访问
- [ ] **基本排版**：文字格式清晰，无错别字

#### 深度验证（根据信息丰富度检查）
- [ ] **公司信息**：如有则核对成立时间、地址等准确性
- [ ] **用户数据**：如引用用户数/评价数，确保来源可靠
- [ ] **技术规格**：如提到API/集成等，验证技术可行性
- [ ] **平台兼容性**：确认支持的平台确实可用
- [ ] **语言支持**：如提到多语言，确认实际支持情况

#### 体验优化（可选但推荐）
- [ ] **关键词优化**：标签和描述包含相关搜索词
- [ ] **视觉一致性**：截图和描述匹配
- [ ] **用户视角**：信息对潜在用户有实际帮助
- [ ] **差异化**：突出与同类工具的区别
- [ ] **更新及时性**：标记信息最后更新时间

## 📊 信息完整度标准（灵活适配）

### 核心信息（优先收集）
- 🎯 **详细描述**（如能获取则100字以上，保持原文风格）
- 💰 **定价模式**（免费/付费/试用/订阅等，根据官网实际情况）
- ⚡ **核心功能**（能找到几个就写几个，不强求数量）
- 👥 **适用场景**（根据工具定位描述，如官网有则采用）
- 🖥️ **平台支持**（Web/Windows/macOS/iOS/Android等）

### 补充信息（尽力收集）
- 🏢 **公司背景**（官网有"关于我们"则补充，没有则跳过）
- 🌟 **用户反馈**（官网展示的评价/案例，没有则不编造）
- 🔗 **集成能力**（明确提到的第三方工具集成）
- 📚 **学习资源**（教程/文档/社区支持情况）
- 🏷️ **标签分类**（基于工具特性添加相关关键词）

### 可选信息（遇则采）
- 📊 **使用统计**（官网显示的用户数/项目数等数据）
- 📅 **更新记录**（版本历史或更新日志）
- 🌐 **多语言**（支持的语言版本）
- 🏛️ **合规认证**（如相关的行业认证）
- 📈 **成功案例**（官网展示的典型应用案例）

## 🔍 信息收集原则

### 1. **真实性优先**
- ✅ 只收集官网和权威来源的真实信息
- ❌ 不编造或推测不存在的内容
- 🔍 标注信息来源和可信度

### 2. **量力而行**
- 📝 根据实际可获得的信息量来决定内容丰富程度
- 🎯 有些工具信息丰富，有些工具信息简单，都是正常的
- ⚖️ 平衡信息完整性和页面美观性

### 3. **突出特色**
- 🌟 重点展示该工具的独特价值主张
- 💡 强调区别于其他工具的核心优势
- 🎯 根据工具类型调整信息重点

## 📝 模板示例（灵活应用）

### 模板A：信息丰富的工具
```typescript
// 适用于官网信息详细的工具（如Maket AI）
{
  detailedDescription: "详细的多段落描述，保持官网原文风格...",
  pricing: {
    subscription: ["Pro: $29/month", "Team: $99/month", "Enterprise: 定制"],
    freeTrial: true
  },
  keyFeatures: ["AI生成设计", "协作功能", "云端同步", "模板库"],
  company: { founded: 2020, headquarters: "旧金山" },
  // 其他可获得的信息...
}
```

### 模板B：信息基础的工具
```typescript
// 适用于官网信息简单的工具
{
  detailedDescription: "简洁的单段描述，突出核心功能...",
  pricing: { free: true } // 或 { subscription: true }
  keyFeatures: ["主要功能1", "主要功能2"], // 能找到几个写几个
  // 其他信息如无法获取则不添加
}
```

### 模板C：极简信息的工具
```typescript
// 适用于官网信息很少的工具
{
  detailedDescription: "基于官网描述的基础说明...",
  // 只有能确认的信息，其他字段省略
}
```

## 🔄 持续优化流程

### 1. 定期更新
- **每月检查**：定价信息更新
- **每季度检查**：功能列表更新
- **每半年检查**：公司信息更新

### 2. 用户反馈
- 收集用户对信息准确性的反馈
- 根据用户需求补充相关信息
- 持续优化信息展示方式

### 3. 性能监控
- 监控页面加载性能
- 优化图片资源
- 改进用户体验指标

## 📝 模板示例

### Maket AI 实例参考
```typescript
{
  id: "maket-ai",
  detailedDescription: "Maket AI is an advanced architectural design platform that leverages artificial intelligence to streamline the entire design process. From initial concept development to detailed construction drawings, Maket AI empowers architects and designers to create innovative, efficient, and sustainable building designs with unprecedented speed and precision.",

  pricing: {
    free: false,
    freeTrial: true,
    subscription: true,
    custom: ["Pro: $299/month", "Enterprise: Custom pricing"]
  },

  keyFeatures: [
    "AI-powered generative design",
    "Automated code compliance checking",
    "3D visualization and rendering",
    "Collaboration tools",
    "Project management integration"
  ],

  useCases: [
    "Residential architecture design",
    "Commercial building planning",
    "Interior space optimization",
    "Sustainable design analysis"
  ],

  targetAudience: [
    "Architectural firms",
    "Interior designers",
    "Real estate developers",
    "Construction companies"
  ]
}
```

## 🚀 快速开始

1. **选择工具**：从工具列表中选择要优化的工具
2. **访问官网**：使用浏览器访问工具官网
3. **收集信息**：按照上述流程收集详细信息
4. **更新数据**：修改 `src/data/tools.ts` 文件
5. **验证效果**：本地测试页面显示
6. **提交部署**：确认无误后提交到GitHub

## 🎯 实战决策流程

### 信息收集决策树
```
开始 → 访问官网
    ↓
官网信息丰富？
    ├─ 是 → 按模板A完整收集
    │        ↓
    │      定价信息清晰？
    │        ├─ 是 → 详细记录各档次价格
    │        └─ 否 → 记录定价模式（免费/付费/订阅）
    │
    └─ 否 →
           ↓
      基础描述清晰？
           ├─ 是 → 按模板B收集核心信息
           │        ↓
           │      能找到3个以上功能？
           │        ├─ 是 → 列出所有找到的功能
           │        └─ 否 → 列出找到的核心功能
           │
           └─ 否 → 按模板C极简处理
                    ↓
              保持原有描述，仅添加可确认的信息
```

### 实际操作示例

#### 示例1：官网信息丰富的大型工具
- **发现**：官网有详细的功能页面、定价页面、关于页面
- **操作**：
  1. 详细记录核心功能（8-12个）
  2. 完整的定价结构（3-5个档次）
  3. 公司背景（成立时间、团队规模）
  4. 用户案例和评价
  5. 技术规格和API信息

#### 示例2：官网简洁的中小型工具
- **发现**：官网只有首页和简单的功能介绍
- **操作**：
  1. 从首页提取核心描述
  2. 记录明显可见的功能（3-5个）
  3. 判断定价模式（免费按钮/定价链接）
  4. 识别平台支持（Web下载链接等）

#### 示例3：信息极简的个人项目
- **发现**：只有一个页面，信息很少
- **操作**：
  1. 保持原有简短描述
  2. 只添加最明显能确认的信息
  3. 不强行扩展内容
  4. 保持页面简洁性

## 💡 实用技巧

### 信息收集技巧
1. **Ctrl+F 搜索关键词**：快速定位"pricing"、"features"、"about"等
2. **页面底部查找**：通常包含联系方式、公司信息
3. **页面源码查看**：有时隐藏的meta信息有帮助
4. **第三方验证**：通过搜索验证官网信息的真实性

### 内容组织技巧
1. **保持原汁原味**：优先使用官网原文，避免过度改写
2. **突出亮点**：每个工具重点突出1-3个最独特的价值
3. **用户视角**：思考"如果我是用户，我想知道什么"
4. **诚实面对**：找不到信息就留空，不要编造

## 📞 支持与帮助

- 技术工具：`src/utils/toolResearcher.ts`
- 数据验证：`src/utils/toolDataUtils.ts`
- 布局优化：`src/pages/ToolDetail.tsx`
- 质量评估：自动运行完整性检查

---

**最后更新**：2025-10-28
**版本**：v1.0
**维护者**：Claude AI Assistant