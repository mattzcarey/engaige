import type { GeneratedContent, Testimonial } from "$lib/types";
import { json } from "@sveltejs/kit";
import { sql } from "@vercel/postgres";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const key = url.searchParams.get("key");

  if (!key) {
    return json({ error: "Key is required" }, { status: 400 });
  }

  try {
    // Fetch the generated content
    const contentResult = await sql<GeneratedContent>`
      SELECT key, hero, description, cta
      FROM generated_content
      WHERE key = ${key}
    `;

    if (contentResult.rows.length === 0) {
      return json({ error: "Content not found" }, { status: 404 });
    }

    const content = contentResult.rows[0];

    // Fetch the testimonials
    const testimonialsResult = await sql<Testimonial>`
      SELECT name, jobtitle as jobTitle, message
      FROM testimonials
      WHERE content_key = ${key}
    `;

    const testimonials = testimonialsResult.rows;

    const response: GeneratedContent = {
      ...content,
      testimonials,
    };

    return json(response);
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ error: "Error fetching data" }, { status: 500 });
  }
};
