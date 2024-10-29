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
      {
        title: "Feature 1",
        description: "Description 1",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
      },
      {
        title: "Feature 2",
        description: "Description 2",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      },
      {
        title: "Feature 3",
        description: "Description 3",
        icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
      },
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
