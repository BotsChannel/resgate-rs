"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import silhuetas from "../../public/silhuetas.png";

interface ImageProps {
  photoUrl: string;
}

const ImageCard: React.FC<ImageProps> = ({ photoUrl }) => {
  const [image, setImage] = useState(silhuetas);

  useEffect(() => {
    const url = `https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/${photoUrl}`;

    // get image
    const fetchImage = async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          setImage(silhuetas);
          const imageData = await response.blob();
          const objectURL = URL.createObjectURL(imageData);
          setImage(objectURL as unknown as StaticImageData);
        }
      } catch (error) {
        console.error("Error fetching image: ", error);
      }
    };

    fetchImage();
  }, [photoUrl]);

  return (
    <Image
      src={image}
      alt={photoUrl}
      fill
      className="object-cover"
      sizes="300px"
    />
  );
};

export default ImageCard;
