import { json } from "@sveltejs/kit";
import { sql } from "@vercel/postgres";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.json();

    // Assuming the form data has 'name' and 'email' fields
    const { name, email, company, jobTitle, personalInfo } = formData;

    // Insert the data into the database
    await sql`
      INSERT INTO users (name, email, company, jobTitle, personalInfo)
      VALUES (${name}, ${email}, ${company}, ${jobTitle}, ${personalInfo})
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
