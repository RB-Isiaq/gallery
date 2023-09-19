"use client";

import Card from "@/components/Card";
import { useState } from "react";
import { imagesFolder } from "./constants";
import ImageGallery from "@/components/ImageGallery";

const Gallery = () => {
  const [images, setImages] = useState(imagesFolder);
  const onDragEnd = (results) => {
    if (!results.destination) {
      return; // Dropped outside the list
    }

    const updatedImages = [...images];
    const [reorderedImage] = updatedImages.splice(results.source.index, 1);
    updatedImages.splice(results.destination.index, 0, reorderedImage);

    setImages(updatedImages);
  };

  return (
    <div className="flex gap-2 bg-black text-white w-screen min-h-screen flex-wrap flex-col md:flex-row">
      <div className="w-full h-full md:h-screen flex flex-col flex-[1] px-4 py-10">
        <p className="text-2xl mb-4">Hello, Isiaq</p>
        <p className="mb-6">Welcome to the home of beautiful images</p>

        <form
          className="flex flex-col gap-3 w-full max-w-[500px] justify-center items-center my-10"
          action=""
        >
          <input
            type="search"
            className="w-full px-3 py-2 rounded-md"
            placeholder="Search image by tag name"
          />
          <button
            className="w-[100px] h-10 flex justify-center items-center rounded-md bg-slate-50 text-black"
            type="submit"
          >
            Search
          </button>
        </form>
        <form
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
        </form>
      </div>
      <div className="flex-[2] w-full flex justify-evenly items-center flex-wrap gap-5 py-10 ">
        <ImageGallery images={images} onDragEnd={onDragEnd} />
      </div>
    </div>
  );
};

export default Gallery;
