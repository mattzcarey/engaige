interface GeneratedContent {
  key: string;
  hero: string;
  description: string;
  cta: string;
  testimonials: Testimonial[];
  features: Feature[];
}

interface Testimonial {
  name: string;
  jobtitle: string;
  message: string;
}

interface Feature {
  title: string;
  description: string;
}

export type { Feature, GeneratedContent, Testimonial };
