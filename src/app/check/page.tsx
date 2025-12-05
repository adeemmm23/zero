"use client";

import Logo from "@/components/logo";
import { useState } from "react";

export default function Page() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

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
    setUploadedUrl(null);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadedUrl(data.url);
      console.log("File uploaded:", data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
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
        <div className="text-center space-y-3">
          {uploading ? (
            <>
              <h2 className="text-xl font-semibold text-foreground">
                Uploading...
              </h2>
              <p className="text-foreground/60 text-sm">
                Please wait while we upload your file
              </p>
            </>
          ) : uploadedUrl ? (
            <>
              <h2 className="text-xl font-semibold text-foreground">
                Upload Complete!
              </h2>
              <p className="text-foreground/60 text-sm break-all">
                {uploadedUrl}
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-foreground">
                {isDragging ? "Drop to check truth" : "Drag & Drop Here"}
              </h2>
              <p className="text-foreground/60 text-sm">
                Drop your file to verify its authenticity
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
