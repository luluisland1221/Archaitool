# Arch AI Tool

A comprehensive directory and showcase platform for AI-powered architecture and design tools. This platform helps architects, designers, and professionals discover and evaluate various AI tools for architecture, interior design, landscape design, and visualization.

🌐 **Live Site**: [https://archaitool.com](https://archaitool.com)

## Overview

Arch AI Tool serves as a centralized hub for discovering AI tools in the architecture and design industry. Users can:
- Browse tools by categories and subcategories
- View detailed information about each tool
- Access direct links to tool websites
- Filter tools based on pricing (free/paid)
- Explore tool features and capabilities

## Recent Updates (January 2025)

### ✅ SEO Optimization
- **Dynamic Titles**: Each page now has unique, descriptive titles
- **Meta Tags**: Complete meta descriptions, keywords, and Open Graph tags
- **Canonical URLs**: Proper canonical links for all pages
- **Structured Data**: Enhanced SEO with proper page structure

### ✅ URL Structure Improvement
- **SEO-Friendly URLs**: Changed from query parameters to path-based routing
- **Before**: `/tools?category=xxx&subcategory=yyy`
- **After**: `/tools/category/subcategory`
- **Tool Pages**: Clean URLs like `/tool/tool-name`

### ✅ Sitemap Enhancement
- **Complete Coverage**: All 59 tools included in sitemap
- **Proper lastmod**: Updated timestamps for better indexing
- **Priority Settings**: Optimized priority and changefreq for each page type
- **80+ Pages**: Comprehensive sitemap with all categories and tools

## Project Structure

```
arch-ai-tool/
├── public/
│   └── logo.svg
├── src/
│   ├── components/
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── data/
│   │   └── tools.ts
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Home.tsx
│   │   ├── ToolDetail.tsx
│   │   └── Tools.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### Key Directories and Files

- `src/components/`: Reusable UI components
- `src/data/`: Data management and tool information
- `src/pages/`: Main page components
- `public/`: Static assets
- Configuration files for TypeScript, Vite, and Tailwind CSS

## Technology Stack

- **Frontend Framework**: React 18.3
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Development Tools**:
  - ESLint for code quality
  - TypeScript for type safety
  - PostCSS for CSS processing

## Installation and Setup

1. Clone the repository:
```bash
git clone [repository-url]
cd arch-ai-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Features

### 1. Category-based Navigation
- Architecture & Spatial Design
- Interior Design
- Landscape & Exterior Design
- General Design Tools
- Real Estate & Marketing

### 2. Tool Categories
- Architectural Design & Generation
- Architectural Visualization & Rendering
- Interior Design & Remodeling
- Virtual Staging & Furnishing
- Landscape Planning & Design
- Multi-domain AI Design
- Design Assistance & Automation

### 3. Detailed Tool Information
- Tool descriptions
- Pricing information
- Direct website links
- Feature highlights
- Category classification

### 4. Responsive Design
- Mobile-friendly interface
- Adaptive layouts
- Touch-friendly interactions
- Responsive images

### 5. User Interface
- Clean, modern design
- Intuitive navigation
- Category filters
- Search functionality (planned)

## Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use functional components
- Implement proper type definitions
- Maintain component modularity

### Component Structure
- Keep components focused and single-responsibility
- Implement proper prop typing
- Use consistent naming conventions
- Document complex logic

### State Management
- Use React hooks for state management
- Implement context where necessary
- Keep state close to where it's used

## Future Enhancements

1. **Search Functionality**
   - Implement full-text search
   - Add filters and sorting options
   - Enable tag-based searching

2. **User Features**
   - User accounts
   - Tool ratings and reviews
   - Favorite tools list
   - Personal collections

3. **Content Expansion**
   - Tool tutorials and guides
   - Case studies
   - User success stories
   - Integration guides

4. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Lazy loading
   - Caching strategies

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For support, please open an issue in the repository or contact the maintainers.

---

*Note: This project is continuously evolving. Check back regularly for updates and new features.*