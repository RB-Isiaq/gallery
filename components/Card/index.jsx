import React from "react";
import Image from "next/image";

// import Icon from "@public/movie.png";

const Card = ({ pix }) => {
  return (
    <div className="relative w-[320px] sm:w-[250px] h-[370px] hover:scale-[1.02] transition-all duration-1000">
      <div className="absolute top-0 flex justify-between w-full p-[15px]">
        <p className="flex justify-center items-center text-[12px] font-bold text-gray-900 rounded-xl bg-[#F3F4F6] bg-opacity-50 backdrop-blur-sm px-2 py-1">
          Football
        </p>
      </div>
      <Image
        src={"/movie.png"}
        alt="picture"
        className="w-full h-[370px] object-cover mb-3 cursor-move"
        width={100}
        height={370}
        draggable={true}
      />
    </div>
  );
};

export default Card;
