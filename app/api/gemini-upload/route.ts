import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || "");

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image") as File;

    const arrayBuffer = await imageFile.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imagePart = {
      inlineData: {
        data: Buffer.from(uint8Array).toString("base64"),
        mimeType: imageFile.type,
      },
    };

    const result = await model.generateContent([
      "Tell me about this image.",
      imagePart,
    ]);

    const response = await result.response;
    const output = response.text();

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Error processing image:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
