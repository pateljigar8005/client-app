import React from "react";
// import Image from "next/image";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Containter = ({
  title,
  imageAlign,
  image,
  content,
  buttonText,
  urlType,
  buttonURL,
}) => {
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;

  const selectedLang = useSelector(
    (state) => state?.siteReducer
  )?.selectedLanguage;
  return (
    <div className={`flex justify-center my-10 py-10 p-5 md:p-0`}>
      {/* content */}
      <div className={`w-full md:w-4/5 my-10 md:flex gap-10`}>
        {/* banner img */}
        {imageAlign === "Left" ? (
          <div className="bg-primary rounded-xl w-full md:w-1/2 h-96">
            {image && (
              <img
                src={image}
                className="w-full h-full"
                // width={519}
                // height={384}
              />
            )}
          </div>
        ) : null}

        <div className="w-full md:w-1/2">
          <h1 className="font-bold text-2xl mb-5 mt-5 md:mt-0">{title}</h1>
          <p className="text-gray-500 text-lg">{content}</p>

          {buttonText && buttonText !== "" ? (
            urlType === "Internal" ? (
              <button
                className="my-5 bg-transparent border border-primary text-gray-500 uppercase p-3 hover:bg-primary hover:text-white"
                onClick={() => {
                  router.push(
                    `/${site_id}/${country_id}/${(selectedLang?.tag).toLowerCase()}/${buttonURL}`
                  );
                }}
              >
                {buttonText}
              </button>
            ) : (
              <a href={buttonURL} target="_blank" rel="noreferrer">
                <button className="my-5 bg-transparent border border-primary text-gray-500 uppercase p-3 hover:bg-primary hover:text-white">
                  {buttonText}
                </button>
              </a>
            )
          ) : null}
        </div>

        {imageAlign === "Right" ? (
          <div className="bg-primary rounded-xl w-full md:w-1/2 h-96">
            {image && (
              <img
                src={image}
                className="w-full h-full"
                // width={519}
                // height={384}
                alt="display pic"
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Containter;
