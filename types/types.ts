export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  pricing: string;
  websiteUrl: string;
  logoUrl: string;
  expertise?: 'Beginner' | 'Pro' | 'Any';
}
