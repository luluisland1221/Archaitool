# 工具信息收集框架 - 灵活有序的数据组织系统

## 🎯 核心设计理念

### 灵活性原则
- **适应现实**：承认不同工具信息丰富度差异很大
- **量力而行**：能收集多少就收集多少，不强求完整
- **突出重点**：根据可用信息调整展示重点

### 有序性原则
- **标准结构**：所有信息都按照统一结构组织
- **分级管理**：按信息质量和完整度分级展示
- **可追溯性**：记录信息来源和收集时间

## 📊 信息质量分级系统

### Level 3 - 信息丰富 (⭐⭐⭐)
**适用场景**：官网信息详细、功能完善的专业工具

**最低要求**：
- ✅ 详细描述 (80字以上)
- ✅ 5+个核心功能
- ✅ 明确定价模式
- ✅ 3+个使用场景
- ✅ 公司基本信息

**可选增强**：
- 🌟 用户评价/数据
- 🌟 技术规格
- 🌟 集成信息
- 🌟 多媒体资源

### Level 2 - 信息标准 (⭐⭐)
**适用场景**：官网信息基础、功能清晰的主流工具

**最低要求**：
- ✅ 详细描述 (40-80字)
- ✅ 3-5个核心功能
- ✅ 基本定价信息
- ✅ 1-2个使用场景

**可选增强**：
- 🌟 平台支持信息
- 🌟 目标用户群体

### Level 1 - 信息基础 (⭐)
**适用场景**：官网信息简单、个人项目或新兴工具

**最低要求**：
- ✅ 基础描述 (20-40字)
- ✅ 1-3个主要功能
- ✅ 基本定价模式 (免费/付费)

**保持原则**：
- 🎯 不强行扩展内容
- 🎯 保持信息真实性
- 🎯 突出核心价值

## 🗂️ 统一数据结构

### 核心字段 (所有级别必需)
```typescript
interface ToolData {
  // 基础信息 (已存在)
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  isPaid: boolean;

  // 收集的信息 (分级填充)
  infoLevel: 1 | 2 | 3;           // 信息质量等级
  lastCollected: string;          // 最后收集时间
  sources: string[];              // 信息来源URLs

  // Level 1+ 必需
  detailedDescription: string;    // 详细描述
  coreFeatures: string[];         // 核心功能 (根据级别调整数量)
  pricingModel: string;           // 定价模式描述

  // Level 2+ 必需
  useCases: string[];             // 使用场景
  targetUsers: string[];          // 目标用户
  platforms: string[];           // 支持平台

  // Level 3 必需
  companyInfo: {                  // 公司信息
    name: string;
    founded?: string;
    headquarters?: string;
  };

  // 可选字段 (有则收集，没有不添加)
  userStats?: {                   // 用户统计
    users?: string;
    projects?: string;
    countries?: string;
  };

  technicalSpecs?: {              // 技术规格
    apiAvailable?: boolean;
    mobileSupport?: boolean;
    languages?: string[];
  };

  integrations?: string[];         // 集成工具
  socialMedia?: object;           // 社交媒体
  supportInfo?: object;           // 支持信息

  // 元数据
  collectionNotes?: string;       // 收集说明
  confidenceLevel: number;        // 信息可信度 (0.7-1.0)
}
```

## 🔍 收集策略框架

### 阶段1：快速评估 (30秒/工具)
```typescript
interface QuickAssessment {
  toolName: string;
  url: string;
  initialImpression: 'rich' | 'standard' | 'basic';
  estimatedLevel: 1 | 2 | 3;
  keyPages: string[];            // 发现的重要页面
  dataHints: string[];           // 明显可见的数据点
}
```

**评估标准**：
- **Rich (Level 3)**：官网有导航菜单 >5项，有专门的定价/功能页面
- **Standard (Level 2)**：官网有完整首页 + 2-3个功能页面
- **Basic (Level 1)**：单页网站或信息极简

### 阶段2：目标收集 (根据级别调整时间)
- **Level 3 工具**：5-10分钟深度收集
- **Level 2 工具**：2-5分钟标准收集
- **Level 1 工具**：30秒-1分钟基础收集

### 阶段3：质量验证
```typescript
interface QualityCheck {
  completenessScore: number;     // 完整度评分 (0-100)
  accuracyIndicators: string[];  // 准确性指标
  missingCriticalInfo: string[]; // 缺失的关键信息
  suggestedActions: string[];    // 改进建议
}
```

## 📝 收集模板系统

### Level 3 模板 - 深度收集
```markdown
## 工具名称: [工具名]
### 信息等级: ⭐⭐⭐ (信息丰富)

#### 📋 核心信息收集清单
- [ ] 首页完整描述 (1-2段，保持原文风格)
- [ ] 定价页面详细信息 (所有档次价格)
- [ ] 功能页面核心功能 (8-12个功能)
- [ ] 关于我们公司信息 (成立时间、地点、规模)
- [ ] 用户统计数据 (用户数、项目数等)
- [ ] 技术规格 (API、移动端、集成等)
- [ ] 社交媒体链接 (LinkedIn, Twitter等)

#### 🌟 可选增强信息
- [ ] 客户案例/成功故事
- [ ] 媒体报道/评价
- [ ] 视频演示链接
- [ ] 文档/教程资源
```

### Level 2 模板 - 标准收集
```markdown
## 工具名称: [工具名]
### 信息等级: ⭐⭐ (信息标准)

#### 📋 核心信息收集清单
- [ ] 首页描述 (1段，40-80字)
- [ ] 明显可见的功能 (3-5个)
- [ ] 定价模式 (免费/付费/订阅)
- [ ] 使用场景 (1-2个)
- [ ] 平台支持 (Web/桌面/移动)

#### 🌟 可选补充信息
- [ ] 目标用户群体
- [ ] 基本联系信息
```

### Level 1 模板 - 基础收集
```markdown
## 工具名称: [工具名]
### 信息等级: ⭐ (信息基础)

#### 📋 最小信息收集
- [ ] 基础描述 (20-40字)
- [ ] 主要功能 (1-3个)
- [ ] 定价模式判断 (免费按钮/付费链接)

#### ✋ 收集原则
- 不强行扩展内容
- 保持信息真实性
- 突出最核心价值
```

## 🎯 动态展示策略

### 页面渲染逻辑
```typescript
function renderToolDetail(tool: ToolData) {
  return {
    // 所有级别都显示
    alwaysShow: [
      'basicInfo',           // 基础信息
      'detailedDescription', // 详细描述
      'coreFeatures',        // 核心功能
      'pricingModel'         // 定价模式
    ],

    // Level 2+ 显示
    level2Plus: tool.infoLevel >= 2 ? [
      'useCases',            // 使用场景
      'targetUsers',         // 目标用户
      'platforms'            // 支持平台
    ] : [],

    // Level 3 显示
    level3Only: tool.infoLevel >= 3 ? [
      'companyInfo',         // 公司信息
      'userStats',           // 用户统计
      'technicalSpecs',      // 技术规格
      'integrations',        // 集成信息
      'socialMedia'          // 社交媒体
    ] : [],

    // 有信息就显示
    conditionalShow: [
      tool.userStats && 'userStats',
      tool.technicalSpecs && 'technicalSpecs',
      tool.integrations && 'integrations'
    ].filter(Boolean)
  };
}
```

### 视觉层次设计
- **Level 1**: 简洁布局，重点突出核心价值
- **Level 2**: 标准布局，完整展示主要信息
- **Level 3**: 丰富布局，多维度展示工具价值

## 🔄 实施流程

### 第一轮：快速分级 (1-2小时)
1. 遍历所有工具URL，快速评估信息丰富度
2. 标记预估等级 (Level 1/2/3)
3. 制定收集优先级 (Level 3 → Level 2 → Level 1)

### 第二轮：分级收集 (根据工具数量)
1. **Level 3 工具**：深度收集，确保信息完整性
2. **Level 2 工具**：标准收集，平衡信息量和效率
3. **Level 1 工具**：基础收集，保持简洁真实

### 第三轮：质量优化
1. 验证信息准确性
2. 优化内容表达
3. 统一格式标准
4. 保存原始来源

## 📊 进度跟踪系统

### 收集进度仪表板
```typescript
interface CollectionProgress {
  total: number;
  completed: {
    level1: number;
    level2: number;
    level3: number;
  };
  inProgress: number;
  notStarted: number;
  averageQualityScore: number;
}
```

### 质量评估标准
- **完整性** (40%)：核心字段覆盖率
- **准确性** (30%)：信息来源可靠性
- **有用性** (20%)：用户价值评估
- **时效性** (10%)：信息新鲜度

## 💡 实战决策树

```
开始访问工具官网
    ↓
官网有多少个主要页面？
    ├─ 5+页面 → Level 3 深度收集
    │   ├─ 有详细定价页面 → 记录所有价格档次
    │   ├─ 有功能介绍页面 → 提取8-12个功能
    │   ├─ 有关于我们页面 → 收集公司信息
    │   └─ 有用户数据 → 记录用户统计
    │
    ├─ 2-4页面 → Level 2 标准收集
    │   ├─ 首页功能描述 → 提取3-5个功能
    │   ├─ 有定价链接 → 记录定价模式
    │   └─ 明显使用场景 → 记录1-2个场景
    │
    └─ 1页面 → Level 1 基础收集
        ├─ 页面描述 → 提取基础描述
        ├─ 明显功能 → 记录1-3个功能
        └─ 免费/付费按钮 → 记录定价模式
```

## 🎯 成功标准

### 内容质量目标
- **Level 3 工具**: 500+字，信息完整度 >90%
- **Level 2 工具**: 200-500字，信息完整度 >70%
- **Level 1 工具**: 50-200字，信息准确度 100%

### 用户体验目标
- **信息有用性**: 每个工具都能让用户了解核心价值
- **决策支持**: 提供足够信息帮助用户选择工具
- **真实性**: 所有信息都有可靠来源，不虚构内容

---

**框架特点**：
✅ **灵活适应** - 根据实际情况调整收集深度
✅ **标准组织** - 统一的数据结构和展示逻辑
✅ **质量保证** - 分级管理和质量评估体系
✅ **可追溯性** - 记录信息来源和收集过程
✅ **用户导向** - 以用户决策需求为核心