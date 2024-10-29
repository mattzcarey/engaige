import type { GeneratedContent } from "$lib/types";
import { json } from "@sveltejs/kit";
import { sql } from "@vercel/postgres";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const key = url.searchParams.get("key");

  if (!key) {
    return json({ error: "Key is required" }, { status: 400 });
  }
  console.log({ fetchingForKey: key });
  try {
    // Fetch the generated content
    const contentResult = await sql`
    SELECT content FROM content_blobs WHERE key = ${key} LIMIT 1
    `;
    const value = contentResult.rows[0].content as GeneratedContent;

    console.log({ value });

    return json(value);
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ error: "Error fetching data" }, { status: 500 });
  }
};
