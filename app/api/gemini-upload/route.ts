import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);

// Export a named POST function for handling POST requests
export async function POST(req: Request) {
  try {
    const { imageData } = await req.json(); // Get JSON data from the request

    const base64Response = await fetch(imageData); // Convert base64 data to a Blob
    const blob = await base64Response.blob();
    const fileUri = URL.createObjectURL(blob); // Create a file URI from the Blob

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      "Tell me about this image.",
      {
        fileData: {
          fileUri: fileUri,
          mimeType: "image/jpeg",
        },
      },
    ]);

    return NextResponse.json({ message: result.response.text() }); // Return a JSON response
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
