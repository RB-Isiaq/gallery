"use client";

import Card from "@/components/Card";
import { useEffect, useState } from "react";
import { imagesFolder } from "./constants";
import ImageGallery from "@/components/ImageGallery";
import ProtectedRoute from "@/components/ProtectedRoute";

const Gallery = () => {
  const [images, setImages] = useState(imagesFolder);
  const [searchValue, setSearchValue] = useState("");
  const onDragEnd = (results) => {
    if (!results.destination) {
      return; // Dropped outside the list
    }

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(results.source.index, 1);
    updatedImages.splice(results.destination.index, 0, reorderedImage);

    setImages(updatedImages);
  };

  useEffect(() => {
    if (searchValue === "") {
      setImages(imagesFolder);
    } else {
      setImages(
        imagesFolder.filter((image) =>
          image.tags.includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue]);

  return (
    // <ProtectedRoute>
    <div className="flex gap-2 bg-black text-white w-full h-full p-2 flex-col lg:flex-row">
      <div className="w-full h-full md:h-screen flex flex-col flex-[1] px-4 py-10">
        <p className="text-2xl mb-4">Hello, user</p>
        <p className="mb-6">Welcome to the home of beautiful images</p>

        <div className="flex flex-col gap-3 w-full max-w-[500px] justify-center items-center my-10">
          <input
            type="search"
            className="w-full px-3 py-2 rounded-md text-black"
            placeholder="Search image by tag name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        {/* <form
          action=""
          className="flex flex-col gap-3 w-full max-w-[500px] justify-center items-center"
        >
          <input
            type="text"
            className="w-full px-3 py-2 rounded-md"
            placeholder="image tag"
          />
          <input type="file" className="w-full px-3 py-2 rounded-md" />
          <button
            className="w-[100px] h-10 flex justify-center items-center rounded-md bg-slate-50 text-black"
            type="submit"
          >
            Upload
          </button>
        </form> */}
      </div>
      <div className="flex-[3] w-full flex justify-evenly py-4 overflow-hidden">
        <ImageGallery images={images} onDragEnd={onDragEnd} />
      </div>
      {/* </ProtectedRoute> */}
    </div>
  );
};

export default Gallery;
