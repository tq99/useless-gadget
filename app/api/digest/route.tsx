import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse, NextRequest } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { foodItems, times } = data; // Expecting food items and times in request body

    // Create a prompt for digestion time calculation
    const prompt = `Foods: ${foodItems.join(", ")} eaten at ${times.join(
      ", "
    )}Return only in this exact format without any explanation:X-Y hours | HH:MM`;
    //const prompt = `Given the following food items: ${foodItems.join(', ')} eaten at: ${times.join(', ')}, how long will it take for them to digest and at what time will they be fully digested? give the answer as a rought estimate no need to be accurate, just give the time taken to digest`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate content with the prompt
    const result = await model.generateContent(prompt);

    const response = await result.response;
    const output = await response.text();

    return NextResponse.json({ output });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}
