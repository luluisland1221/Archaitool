export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  publishedDate: string;
  readTime: number;
  tags: string[];
  featuredImage?: string;
  seo: {
    description: string;
    keywords: string[];
  };
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  description: string;
  color?: string;
}