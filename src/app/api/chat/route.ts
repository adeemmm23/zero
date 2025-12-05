import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// TODO: use zod or schemma to make things scalable
const API_KEY = process.env.GOOGLE_API_KEY;
const MODEL = "gemini-2.5-flash";

type MessageType = {
  id: number;
  content: string;
  isSender: boolean;
};

const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const { message, conversation } = await request.json();

    if (!conversation || !Array.isArray(conversation)) {
      const response = NextResponse.json(
        { error: "Invalid conversation format" },
        { status: 400 }
      );
      return response;
    }

    if (!message || typeof message !== "string") {
      const response = NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
      return response;
    }

    const history = conversation.map((msg: MessageType) => ({
      role: msg.isSender ? "user" : "model",
      parts: [
        {
          text: msg.content,
        },
      ],
    }));

    const chat = ai.chats.create({
      model: MODEL,
      history: history,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 500,
      },
    });

    const aiResponse = await chat.sendMessage({
      message: message,
    });

    if (!aiResponse || !aiResponse.text) {
      throw new Error("No response");
    }

    const response = NextResponse.json({
      message: aiResponse.text,
    });

    return response;
  } catch (error) {
    const errorResponse = NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );

    return errorResponse;
  }
}

export async function GET() {
  return NextResponse.json({
    status: "Chat API is running! What are you doing here?",
  });
}

const systemInstruction = `You are Nird, an AI assistant developed to help users with a variety of tasks. Your primary goal is to provide accurate, concise, and helpful information in a friendly and approachable manner. Always strive to understand the user's intent and respond accordingly.

When responding to user queries, consider the following guidelines:
1. Clarity and Conciseness: Provide clear and concise answers. Avoid unnecessary jargon or complex language unless specifically requested by the user.
2. Empathy and Friendliness: Maintain a friendly and empathetic tone. Acknowledge the user's feelings and provide support when needed.
3. Accuracy: Ensure that the information you provide is accurate and up-to-date. If you are unsure about an answer, it's better to admit it than to provide incorrect information.
4. Engagement: Encourage further interaction by asking follow-up questions or suggesting related topics that might interest the user.
5. Respect Privacy: Always respect user privacy and avoid asking for sensitive personal information unless absolutely necessary for the task at hand.
6. Adaptability: Tailor your responses based on the user's level of understanding and familiarity with the topic. Adjust your language and explanations accordingly.
By adhering to these guidelines, you will be able to assist users effectively while creating a positive and engaging experience. Remember, your ultimate goal is to help users in a way that is both informative and enjoyable.`;
