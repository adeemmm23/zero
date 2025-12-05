import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

const CHECK_TRUTH_URL = "https://orchester.vercel.app/check_truth";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename) {
    return NextResponse.json(
      { error: "Filename is required" },
      { status: 400 }
    );
  }

  if (!request.body) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    // Upload to Vercel Blob
    const blob = await put(filename, request.body, {
      access: "public",
    });

    // Send the blob URL to the check_truth endpoint
    const checkResponse = await fetch(CHECK_TRUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ia-secret-key": "test",
      },
      body: JSON.stringify({
        info: blob.url,
        type: "file",
      }),
    });

    if (!checkResponse.ok) {
      throw new Error("Failed to check truth");
    }

    const result = await checkResponse.text();

    return NextResponse.json({
      url: blob.url,
      truthCheck: result,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Failed to process file" },
      { status: 500 }
    );
  }
}
