import type { Feature, GeneratedContent, Testimonial } from "$lib/types";
import { json } from "@sveltejs/kit";
import { sql } from "@vercel/postgres";
import type { RequestHandler } from "./$types";

const generateTinyKey = (): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 4 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};

export const POST: RequestHandler = async ({ request }) => {
  console.log("got_here");
  try {
    const formData = await request.json();

    const { name, relation, company, jobTitle, otherInfo } = formData;

    // save the user data to the database
    await sql`
      INSERT INTO users (name, relation, company, job_title, other_info)
      VALUES (${name}, ${relation}, ${company}, ${jobTitle}, ${otherInfo})
    `;

    // Generate the copy (placeholder for now)
    const hero = "Generated hero content";
    const description = "Generated description content";
    const cta = "Generated CTA content";

    // Generate a tiny key
    const key = generateTinyKey();

    // Generate testimonials (placeholder for now)
    const testimonials: Testimonial[] = [
      { name: "John Doe", jobtitle: "Developer", message: "Great product!" },
      { name: "Jane Smith", jobtitle: "Designer", message: "Awesome service!" },
    ];

    const features: Feature[] = [
      { title: "Feature 1", description: "Description 1" },
      { title: "Feature 2", description: "Description 2" },
    ];

    // Create the content object
    const content: GeneratedContent = {
      key,
      hero,
      description,
      cta,
      testimonials,
      features,
    };

    // Save the entire content object as a JSON blob
    await sql`
      INSERT INTO content_blobs (key, content)
      VALUES (${key}, ${JSON.stringify(content)})
    `;

    return json({ success: true, message: "Data saved successfully", key });
  } catch (error) {
    console.error("Error saving data:", error);
    return json(
      { success: false, message: "Error saving data" },
      { status: 500 }
    );
  }
};
