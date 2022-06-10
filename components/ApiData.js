import React, { useEffect, useState } from "react";

const ApiData = ({ data }) => {
  const [products, setProducts] = useState([]);

  const fetchAllProductData = async () => {
    try {
    } catch (err) {}
  };

  useEffect(() => {
    fetchAllProductData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="bg-third flex items-center justify-center py-10 px-5 md:px-0">
      <div className="w-full md:w-4/5">
        <h1 className={`font-bold text-3xl text-center`}>{data?.heading}</h1>
        <br />
      </div>
    </div>
  );
};

export default ApiData;
