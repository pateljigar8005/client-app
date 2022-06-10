import React from "react";
// import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const SliderContainer = ({ data }) => {
  return (
    <div className="bg-third flex items-center justify-center py-10 px-5 md:px-0">
      <div className="w-full md:w-4/5">
        <h1 className={`font-bold text-3xl text-center`}>{data?.heading}</h1>

        <br />

        <p className={`text-lg text-gray-500 text-center`}>{data?.content}</p>

        <div className={`flex my-10 justify-center`}>
          <Carousel
            autoPlay
            infiniteLoop
            renderThumbs={() => {}}
            renderIndicator={() => {}}
            onChange={() => {}}
            onClickItem={() => {}}
            onClickThumb={() => {}}
          >
            {data?.slider_images?.map((x, index) => {
              return (
                <div key={index}>
                  <img
                    src={x?.image}
                    className="block w-full object-cover md:max-h-96 max-h-56"
                    alt={x?.image}
                    // layout="fill"
                    // objectFit="undefined"
                    // width={600}
                    // height={450}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default SliderContainer;
