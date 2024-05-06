"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import silhueta from "../../public/silhuetas.png";

interface ImageProps {
  photoUrl: string;
}

const ImageCard: React.FC<ImageProps> = ({ photoUrl }) => {
  const [image, setImage] = useState<StaticImageData | string>(silhueta);

  useEffect(() => {
    const url = `https://mhlvqqjzhwsfunzjwdxs.supabase.co/storage/v1/object/public/images/${photoUrl}`;

    // get image
    const fetchImage = async () => {
      try {
        const response = await fetch(url).then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res;
        });
        if (response.ok) {
          const imageData = await response.blob();
          const objectURL = URL.createObjectURL(imageData);
          setImage(objectURL);
        }
      } catch (error) {
        setImage(silhueta);
        console.error("Error fetching image: ", error);
      }
    };
    if (photoUrl !== "null") {
      fetchImage();
    } else {
      setImage(silhueta);
    }
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
