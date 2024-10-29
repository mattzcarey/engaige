import Instructor from "@instructor-ai/instructor";
import OpenAI from "openai";
import { z } from "zod";
import type { GeneratedContent, User } from "../types";

const oai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY ?? undefined,
});

const client = Instructor({
  client: oai,
  mode: "TOOLS",
});

const copyPrompt = `You are tasked with creating a customized website copy for a startup called Engaige. Engaige is a warm lead conversion tool. It is a tool which specializes in personalizing websites to attract and convert users effectively. 

Write the hero section, description, and call to action for the Engaige website. Your goal is to create compelling content based on the provided user information.

First, carefully review the user information provided.

Analyze the given information, paying close attention to the user's name, job title, company, and any other relevant details. Use this information to inform your content creation process.

Now, follow these steps to create personalized content:

1. Hero Section:
   Create a brief, punchy, 6-8 word attention-grabbing hero headline that speaks directly to the user based on their role and industry. Include our company name Engaige in the hero.

2. Description:
   Write a concise description (2 sentences) that elaborates on how Engaige, the warm lead conversion tool, can benefit the user's specific situation. Make a pun or reference the user's name or company name. You should speak directly to the user.

3. Call to Action (CTA):
   Craft a compelling CTA that encourages the user to take the next step. This should be a short, action-oriented phrase that relates to their professional goals or pain points.

When creating this content, keep the following guidelines in mind:
- Maintain a professional yet friendly tone
- Focus on the benefits specific to the user's role and industry
- Use language that resonates with their level of expertise
- Be concise and impactful

Also generate 3 features and 3 testimonials for the product.

For the features, think about what makes the product unique and how it can benefit the user. Make sure to generate a unique svg icon for each feature.

The Testimonials should be from happy customers who have seen the benefits of using Engaige. They should be from job titles similar to the user's job title and similar industry.

Ensure that each element is tailored to the user based on the provided information, creating a personalized experience that will resonate with them and increase the likelihood of conversion.`;

const CopySchema = z.object({
  hero: z.string().describe("A brief, attention-grabbing hero headline"),
  description: z.string().describe("A concise description of the product"),
  cta: z
    .string()
    .describe(
      "A compelling CTA that encourages the user to take the next step"
    ),
  features: z
    .array(
      z.object({
        icon: z.string().describe("A svg icon for the feature"),
        title: z.string().describe("A title of a feature"),
        description: z.string().describe("A description of a feature"),
      })
    )
    .describe("3 features of the product"),
  testimonials: z
    .array(
      z.object({
        name: z.string().describe("The name of the testimonial author"),
        jobtitle: z
          .string()
          .describe("The job title of the testimonial author"),
        message: z.string().describe("A testimonial message"),
      })
    )
    .describe("3 testimonials from happy customers"),
});

export const generateCopy = async (
  user: User
): Promise<Omit<GeneratedContent, "key">> => {
  const res = await client.chat.completions.create({
    messages: [
      { role: "system", content: copyPrompt },
      { role: "user", content: `User: ${JSON.stringify(user)}` },
    ],
    model: "gpt-4o",
    response_model: {
      schema: CopySchema,
      name: "Copy",
    },
  });

  return res;
};
