import { json } from "@sveltejs/kit";
import { sql } from "@vercel/postgres";
import { randomUUID } from "crypto";
import type { RequestHandler } from "./$types";

interface Testimonial {
  name: string;
  jobtitle: string;
  message: string;
}

export const POST: RequestHandler = async ({ request }) => {
  console.log("got_here");
  try {
    const formData = await request.json();

    const { name, relation, company, jobTitle, otherInfo } = formData;

    // Save this data to postgres
    await sql`
      INSERT INTO users (name, relation, company, job_title, other_info)
      VALUES (${name}, ${relation}, ${company}, ${jobTitle}, ${otherInfo})
    `;

    // Generate the copy (placeholder for now)
    const hero = "Generated hero content";
    const description = "Generated description content";
    const cta = "Generated CTA content";

    // Generate a UUID
    const key = randomUUID();

    // Save this copy data to postgres under the uuid key
    await sql`
      INSERT INTO generated_content (key, hero, description, cta)
      VALUES (${key}, ${hero}, ${description}, ${cta})
    `;

    // Generate testimonials (placeholder for now)
    const testimonials: Testimonial[] = [
      { name: "John Doe", jobtitle: "Developer", message: "Great product!" },
      { name: "Jane Smith", jobtitle: "Designer", message: "Awesome service!" },
    ];

    // Save the testimonials array to postgres under the uuid key
    for (const testimonial of testimonials) {
      await sql`
        INSERT INTO testimonials (content_key, name, jobtitle, message)
        VALUES (${key}, ${testimonial.name}, ${testimonial.jobtitle}, ${testimonial.message})
      `;
    }

    return json({ success: true, message: "Data saved successfully", key });
  } catch (error) {
    console.error("Error saving data:", error);
    return json(
      { success: false, message: "Error saving data" },
      { status: 500 }
    );
  }
};
