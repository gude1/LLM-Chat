import { NextRequest, NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";

type RequestBody = {
  messages: [];
};

const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

// export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const { messages } = body;

  try {
    const stream = inference.chatCompletionStream({
      model: process.env.HUGGINGFACE_API_MODEL,
      messages: messages,
      max_tokens: 1000,
    });

    const readableStream = new ReadableStream({
      async start(controller: ReadableStreamDefaultController) {
        const reader = stream[Symbol.asyncIterator]();

        while (true) {
          if (req.signal.aborted) {
            controller.close();
            return;
          }

          const { done, value } = await reader.next();
          if (done) break;

          const content = value.choices[0]?.delta?.content || "";
          controller.enqueue(content);
        }
        controller.close();
      },
      cancel() {
        console.log("Request was cancelled");
      },
    });

    return new NextResponse(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
