import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "../Card";

const ImageGallery = ({ images, onDragEnd }) => {
  const [direction, setDirection] = useState("vertical");

  useEffect(() => {
    const handleResize = () => {
      // Update the layout class based on screen width
      if (window.innerWidth >= 641) {
        setDirection("horizontal");
      } else {
        setDirection("vertical");
      }
    };

    // Initial setup
    handleResize();

    // Listen for window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="image-gallery" direction={direction}>
        {(provided) => (
          <div
            className="w-full flex  flex-col justify-center items-center sm:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided) => (
                  <div
                    className={`relative w-[250px] h-[370px] hover:scale-[1.02]  `}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="absolute top-0 p-[15px]">
                      <p className="flex justify-center items-center text-[12px] font-bold text-gray-900 rounded-lg bg-[#F3F9F6] bg-opacity-50 backdrop-blur-sm px-2 py-1">
                        {image.tags}
                      </p>
                    </div>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full  "
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ImageGallery;
