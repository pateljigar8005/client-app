import React from "react";
// import Image from "next/image";

export const ProductListContainer = ({ data }) => {
  return (
    <div className="bg-third flex items-center justify-center py-10 px-5 md:px-0">
      <div className="w-full md:w-4/5">
        <div className="grid-container">
          {data?.product_list?.map((x, index) => {
            return (
              <div className="grid-item" key={index}>
                <div className="flex justify-center">
                  <div
                    className="rounded-lg shadow-lg bg-white max-w-sm"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <img
                      className="rounded-t-lg"
                      src={x?.image}
                      // layout="fill"
                      // width={500}
                      // height={250}
                      // objectFit="contain"
                      alt=""
                    />

                    <div className="p-6">
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        {x?.name}
                      </h5>
                      {x?.fields?.map((s, index) => {
                        return (
                          <div className="flex" key={index}>
                            <div className="w-2/5">
                              <p className="text-gray-700 text-base">
                                {s?.label}:
                              </p>
                            </div>
                            <div className="w-2/4">
                              <p className="text-gray-700 text-base">
                                {s?.value}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
