"use client";

import Logo from "@/components/logo";
import { useState } from "react";

interface TruthCheckResult {
  true_decision: string;
  reason: string;
}

export default function Page() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [truthResult, setTruthResult] = useState<TruthCheckResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    // Get the dropped files
    const files = e.dataTransfer.files;

    // TODO: Process the dropped files to check truth
    handleFileDrop(files);
  };

  const handleFileDrop = async (files: FileList) => {
    if (files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setTruthResult(null);
    setError(null);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      const parsedResult = JSON.parse(data.truthCheck);
      setTruthResult(parsedResult);
      console.log("Truth check result:", parsedResult);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("Error uploading file:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center grow">
      {/* Logo on top */}
      <div className="mb-8">
        <Logo className="w-32 h-auto" />
      </div>

      {/* Huge drag and drop box */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`
          w-full max-w-4xl h-96 
          border-2 border-dashed rounded-2xl
          flex flex-col items-center justify-center
          transition-all duration-200 ease-in-out
          cursor-pointer
          ${
            isDragging
              ? "border-foreground bg-foreground/10 scale-105"
              : "border-foreground/30 bg-background hover:border-foreground/50 hover:bg-foreground/5"
          }
        `}
      >
        <div className="text-center space-y-3 px-8">
          {uploading ? (
            <>
              <div className="flex items-center justify-center mb-4">
                <span className="symbols animate-spin text-4xl">hourglass</span>
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Checking Truth...
              </h2>
              <p className="text-foreground/60 text-sm">
                Uploading file and verifying authenticity
              </p>
            </>
          ) : error ? (
            <>
              <h2 className="text-xl font-semibold text-red-500">
                Error Occurred
              </h2>
              <p className="text-foreground/60 text-sm">{error}</p>
              <button
                onClick={() => {
                  setError(null);
                  setTruthResult(null);
                }}
                className="mt-4 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity"
              >
                Try Again
              </button>
            </>
          ) : truthResult ? (
            <>
              <h2 className="text-xl font-semibold text-foreground">
                Truth Check Complete!
              </h2>
              <div className="mt-4 space-y-3 max-w-2xl">
                <div className="bg-foreground/5 rounded-lg p-4 text-left space-y-3">
                  <div>
                    <p className="text-foreground/80 text-sm font-semibold mb-1">
                      Decision:
                    </p>
                    <p className="text-foreground/70 text-sm">
                      {truthResult.true_decision}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground/80 text-sm font-semibold mb-1">
                      Reason:
                    </p>
                    <p className="text-foreground/70 text-sm">
                      {truthResult.reason}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setTruthResult(null);
                  setError(null);
                }}
                className="mt-4 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-80 transition-opacity"
              >
                Check Another File
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-foreground select-none pointer-events-none">
                {isDragging ? "Drop to check truth" : "Drag & Drop Here"}
              </h2>
              <p className="text-foreground/60 text-sm select-none pointer-events-none">
                Drop your file to verify its authenticity
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
