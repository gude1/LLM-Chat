import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";

// export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { url, filter, maxExecutionTime } = await req.json();

  try {
    const response = await axios.get(url, { timeout: maxExecutionTime * 1000 });
    const html = response.data;
    const $ = cheerio.load(html);

    let content = "";

    $("script, style, iframe").remove();

    if (filter) {
      content = $("body").text(); // Get the text without any tags
    } else {
      content = $("body").html() || ""; // Get the HTML content
    }

    return NextResponse.json({ content }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred ${JSON.stringify(error)}` },
      { status: 500 }
    );
  }
}
