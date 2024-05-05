"use client";
import { addImage } from "@/lib/prisma/queries/images";
import { useState } from "react";

export default function Page() {
  const [file, setfile] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const filename = `teste${Math.floor(Math.random() * 1000000)}`;
    const imageUrl = await addImage(file);
    
    console.log(imageUrl);
  };

  const handleFileSelected = (e: any) => {
    setfile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" onChange={handleFileSelected} />
      <button type="submit">Upload image</button>
    </form>
  );
}