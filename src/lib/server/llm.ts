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

const copyPrompt = `You are tasked with creating a customized website hero section, description, and call to action for a warm lead conversion tool. This tool specializes in personalizing websites to attract and convert users effectively. Your goal is to create compelling content based on the provided user information.

First, carefully review the user information provided.

Analyze the given information, paying close attention to the user's name, job title, company, and any other relevant details. Use this information to inform your content creation process.

Now, follow these steps to create personalized content:

1. Hero Section:
   Create a brief, attention-grabbing hero headline that speaks directly to the user's role and industry. Incorporate their name or company name if appropriate. The hero should be no longer than one sentence.

2. Description:
   Write a concise description (2-3 sentences) that elaborates on how the warm lead conversion tool can benefit the user's specific situation. Reference their job title, company, or industry to make it more relevant.

3. Call to Action (CTA):
   Craft a compelling CTA that encourages the user to take the next step. This should be a short, action-oriented phrase that relates to their professional goals or pain points.

When creating this content, keep the following guidelines in mind:
- Maintain a professional yet friendly tone
- Focus on the benefits specific to the user's role and industry
- Use language that resonates with their level of expertise
- Be concise and impactful

Also generate 3 features and 3 testimonials for the product.

For the features, think about what makes the product unique and how it can benefit the user. Make sure to generate a svg icon for each feature.

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
