import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ImageGallery = ({ images, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="image-gallery" direction="both">
        {(provided) => (
          <div
            className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border-2 border-red-600"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {images.map((image, index) => (
              <Draggable key={image.id} draggableId={image.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    className={`w-[320px] sm:w-[250px] group rounded-lg overflow-hidden shadow-md hover:shadow-lg ${
                      snapshot.isDragging ? "enlarge-while-dragging" : ""
                    }`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto"
                    />
                    <div className="bg-white p-2 text-gray-800">
                      {image.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-200 rounded-full text-sm mr-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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
