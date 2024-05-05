import React from "react";
import ImageForm from "@/components/ImageForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Upload your image</h1>
      <ImageForm />
    </main>
  );
}