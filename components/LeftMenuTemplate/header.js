import React, { useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, ChevronDown } from "react-feather";
import { setSelectedLang } from "../../redux/actions/index";
import Logo from "../../images/packimpex-logo-colour.png";

const VerticalHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { site_id, country_id, lang_id, page_id } = router.query;
  const languageMenu = useSelector((state) => state.siteReducer)?.languageList;
  const selectedLang = useSelector(
    (state) => state?.siteReducer
  )?.selectedLanguage;
  const sitePageData = useSelector((state) => state?.siteReducer)?.sitesAllData;
  const [langToggle, handleLangToggle] = useState(false);

  return (
    <div className="p-3 vertical-sidebar-header">
      <div>
        <img
          src={Logo.src}
          className="h-10 md:h-full"
          // layout="fill"
          // objectFit="contain"
          alt="logo"
        />
      </div>

      <div className="flex justify-center mt-3">
        <div className="form-group relative w-40">
          <div
            className="border p-3 flex items-center justify-between text-xs cursor-pointer grap-5"
            onClick={() => handleLangToggle(!langToggle)}
          >
            {selectedLang?.title}

            <span className="">
              {langToggle ? (
                <ChevronDown size={15} />
              ) : (
                <ChevronRight size={15} />
              )}
            </span>
          </div>

          {/* LANGUAGES LOOP */}
          {langToggle && (
            <div
              className="absolute shadow-lg bg-white w-full text-sm"
              style={{ zIndex: 111 }}
            >
              <ul className="text-gray-500">
                {languageMenu.map((lang, i) => {
                  return (
                    selectedLang?.title !== lang?.title && (
                      <li
                        key={i}
                        className="p-3 hover:bg-primary hover:text-white cursor-pointer"
                        onClick={() => {
                          dispatch(setSelectedLang(lang));
                          handleLangToggle(false);

                          const pageDatas =
                            sitePageData?.country_wise_data?.length > 0
                              ? sitePageData?.country_wise_data
                                  .filter(
                                    (x) => Object.keys(x)[0] !== undefined
                                  )
                                  .filter(
                                    (x) =>
                                      Object.keys(x)[0].toUpperCase() ===
                                      country_id.toUpperCase()
                                  )[0][country_id.toUpperCase()][0][
                                  lang?.tag.toLowerCase()
                                ]
                              : [];
                          const showPage_id =
                            pageDatas.length > 0
                              ? pageDatas[0]?.address
                              : "no-page";

                          router.push(
                            `/${site_id}/${country_id.toLowerCase()}/${(lang?.tag).toLowerCase()}/${showPage_id}`
                          );
                        }}
                      >
                        {lang?.title}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerticalHeader;
