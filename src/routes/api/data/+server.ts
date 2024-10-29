import { generateCopy } from "$lib/server/llm";
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
  try {
    const formData = await request.json();

    const { name, relation, company, jobTitle, otherInfo } = formData;

    // save the user data to the database
    await sql`
      INSERT INTO users (name, relation, company, job_title, other_info)
      VALUES (${name}, ${relation}, ${company}, ${jobTitle}, ${otherInfo})
    `;

    // Generate a tiny key
    const key = generateTinyKey();

    // Create the content object
    const content = await generateCopy(formData);

    // Save the entire content object as a JSON blob
    await sql`
      INSERT INTO content_blobs (key, content)
      VALUES (${key}, ${JSON.stringify({
        ...content,
        key,
      })})
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
