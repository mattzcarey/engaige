interface GeneratedContent {
  key: string;
  hero: string;
  description: string;
  cta: string;
  testimonials: Testimonial[];
}

interface Testimonial {
  name: string;
  jobtitle: string;
  message: string;
}

export type { GeneratedContent, Testimonial };
