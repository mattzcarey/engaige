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
  icon: string;
  title: string;
  description: string;
}

interface User {
  name: string;
  relation: string;
  company: string;
  jobTitle: string;
  otherInfo: string;
}

export type { Feature, GeneratedContent, Testimonial, User };
