import { json } from "@sveltejs/kit";
import { sql } from "@vercel/postgres";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.json();

    const { name, relation, company, jobTitle, otherInfo } = formData;

    // Insert the data into the database
    await sql`
      INSERT INTO users (name, relation, company, job_title, other_info)
      VALUES (${name}, ${relation}, ${company}, ${jobTitle}, ${otherInfo})
    `;

    return json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    console.error("Error saving data:", error);
    return json(
      { success: false, message: "Error saving data" },
      { status: 500 }
    );
  }
};
