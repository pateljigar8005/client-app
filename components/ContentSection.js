import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const ContentSection = ({
  contentAlign,
  title,
  content,
  buttonText,
  buttonUrl,
  urlType,
}) => {
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;
  const selectedLang = useSelector(
    (state) => state?.siteReducer
  )?.selectedLanguage;

  return (
    <div className="bg-third flex items-center justify-center py-10 px-5 md:px-0">
      <div className="w-full md:w-4/5">
        <h1
          className={`font-bold text-3xl ${contentAlign === "Left"
              ? "text-left"
              : contentAlign === "Right"
                ? "text-right"
                : "text-center"
            }`}
        >
          {title}
        </h1>
        <br />
        <p
          className={`text-lg text-gray-500 ${contentAlign === "Left"
              ? "text-left"
              : contentAlign === "Right"
                ? "text-right"
                : "text-center"
            }`}
        >
          {content}
        </p>

        {/* button */}
        {buttonText && buttonText !== "" ? (
          urlType === "Internal" ? (
            <div
              className={`flex my-10 ${contentAlign === "Left"
                  ? "justify-start"
                  : contentAlign === "Right"
                    ? "justify-end"
                    : "justify-center"
                }`}
            >
              <button
                className="my-5 bg-transparent border border-primary text-gray-500 uppercase p-3 hover:bg-primary hover:text-white"
                onClick={() => {
                  router.push(
                    `/${site_id}/${country_id}/${(selectedLang?.tag).toLowerCase()}/${buttonUrl}`
                  );
                }}
              >
                {buttonText}
              </button>
            </div>
          ) : (
            <div
              className={`flex my-10 ${contentAlign === "Left"
                  ? "justify-start"
                  : contentAlign === "Right"
                    ? "justify-end"
                    : "justify-center"
                }`}
            >
              <a href={buttonUrl} target="_blank" rel="noreferrer">
                <button className="bg-transparent border border-primary text-gray-500 uppercase p-3 hover:bg-primary hover:text-white">
                  {buttonText}
                </button>
              </a>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ContentSection;
