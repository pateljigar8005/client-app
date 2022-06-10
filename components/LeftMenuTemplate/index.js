import React, { useState, useEffect } from "react";
// import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, Search, X, ChevronRight, ChevronDown } from "react-feather";
import { setSelectedLang } from "../../redux/actions/index";
import VerticalMenu from "./verticalMenu";
import PageFooter from "../footer";
import Container from "../Containter";
import ContentSection from "../ContentSection";
import SliderContainer from "../SliderContainer";
import ApiData from "../ApiData";
import { ProductListContainer } from "../ProductListContainer";
import Logo from "../../images/packimpex-logo-colour.png";

const LeftMenuTemplate = ({ side, filteredPageData }) => {
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;
  const dispatch = useDispatch();
  const languageMenu = useSelector((state) => state.siteReducer)?.languageList;
  const querySiteID = useSelector((state) => state.siteReducer)?.siteId;
  const selectedLang = useSelector(
    (state) => state?.siteReducer
  )?.selectedLanguage;
  const siteMenuList = useSelector(
    (state) => state?.siteReducer
  )?.siteMenuItems;

  const [menuList, setMenuList] = useState([]);
  const [langToggle, handleLangToggle] = useState(false);
  const [toggleBlock, handleToggleBlock] = useState(false);

  const menuBlock = (
    <>
      {menuList?.map((link, i) => {
        return (
          <Link
            key={i}
            href={`/${site_id}/${country_id.toLowerCase()}/${
              selectedLang?.tag
            }/${link.url}`}
          >
            <a
              className={
                link.url === page_id
                  ? "block text-primary"
                  : "text-gray-500 block"
              }
            >
              {link.name}
            </a>
          </Link>
        );
      })}
    </>
  );

  const translatePageBlock = (
    <div className="form-group relative w-40">
      <div
        className="border p-3 flex items-center justify-between text-xs cursor-pointer gap-5"
        onClick={() => handleLangToggle(!langToggle)}
      >
        {selectedLang?.title}

        <span className="">
          {langToggle ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
        </span>
      </div>

      {/* languages looop here */}
      {langToggle && (
        <div className="absolute shadow-lg bg-white w-full text-sm">
          <div className="text-gray-500 flex flex-col">
            {languageMenu.map((lang, i) => {
              const pageDatas =
                sitePageData?.country_wise_data?.length > 0
                  ? sitePageData?.country_wise_data
                      .filter((x) => Object.keys(x)[0] !== undefined)
                      .filter(
                        (x) =>
                          Object.keys(x)[0].toUpperCase() ===
                          country_id.toUpperCase()
                      )[0][country_id.toUpperCase()][0][lang?.tag.toLowerCase()]
                  : [];
              const showPage_id =
                pageDatas.length > 0 ? pageDatas[0]?.address : "no-page";
              return (
                selectedLang?.title !== lang?.title && (
                  <Link
                    key={i}
                    href={`/${site_id}/${country_id.toLowerCase()}/${
                      lang?.tag
                    }/${showPage_id}`}
                    onClick={() => {
                      dispatch(setSelectedLang(lang));
                      handleLangToggle(false);
                    }}
                  >
                    <a className="p-3 hover:bg-primary hover:text-white cursor-pointer">
                      {lang?.title}
                    </a>
                  </Link>
                )
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  useEffect(() => {
    if (siteMenuList && siteMenuList.length > 0 && selectedLang) {
      const sitesMenuItems = siteMenuList?.filter(
        (m) => Object.keys(m)[0] === selectedLang?.tag
      )[0]
        ? siteMenuList?.filter(
            (m) => Object.keys(m)[0] === selectedLang?.tag
          )[0][selectedLang?.tag]
        : [];
      setMenuList(sitesMenuItems);
    }
    // eslint-disable-next-line
  }, [siteMenuList, selectedLang]);

  return (
    <div className="flex">
      {side === "Left" ? <VerticalMenu side={side} /> : null}

      {/* PAGE CONTENT */}
      <div
        className={`page-content ${
          side === "Left" ? "vertical-left-content" : "vertical-right-content"
        }`}
      >
        {/* TABLET & MOBILE MENU BAR (NAVBAR) */}
        <div className="w-full justify-center sticky top-0 bg-white p-2 shadow-xl z-10 res-vertical-menu">
          <div className="w-full flex justify-between items-center">
            <div
              className="block"
              onClick={() => handleToggleBlock(!toggleBlock)}
            >
              {toggleBlock ? <X /> : <Menu />}
            </div>

            <div className="">
              <img
                src={Logo?.src}
                className="h-10"
                // layout="fill"
                // objectFit="contain"
                alt="logo"
              />
            </div>

            <div className="md:space-y-5">
              <div className="flex items-center gap-2 md:gap-5 justify-end">
                <Search className="text-primary" size={20} />
                <button className="bg-primary text-white py-2 md:py-4 px-5 md:px-20">
                  Search
                </button>
              </div>
            </div>
          </div>

          {toggleBlock && (
            <div className="block px-5 space-y-5 py-10 h-screen">
              {menuBlock}
              {translatePageBlock}
            </div>
          )}
        </div>

        {/* PAGE CONTENT HERE */}
        {filteredPageData === null
          ? page_id === "no-page"
            ? "PAGE NOT FOUND"
            : "PAGE LOADING..."
          : filteredPageData?.content
              ?.sort((a, b) => {
                return a?.order - b?.order;
              })
              ?.map((x, index) => {
                if (x?.imageSlider === true) {
                  return <SliderContainer key={index} data={x} />;
                } else if (x?.isProductList === true) {
                  return <ProductListContainer key={index} data={x} />;
                } else if (x?.isAPIData === true) {
                  return <ApiData key={index} data={x} />;
                } else if (x?.withImg === true) {
                  return (
                    <Container
                      key={index}
                      title={x?.heading}
                      content={x?.content}
                      imageAlign={x?.imgAlign}
                      image={x?.image}
                      urlType={x?.urlType?.value}
                      countryId={country_id}
                      buttonText={x?.buttonText}
                      buttonURL={x?.buttonURL}
                    />
                  );
                } else {
                  return (
                    <ContentSection
                      key={index}
                      contentAlign={x?.contAlign || "center"}
                      title={x?.heading}
                      content={x?.content}
                      buttonText={x?.buttonText || ""}
                      urlType={x?.urlType?.value}
                      countryId={country_id}
                      buttonUrl={x?.buttonURL || ""}
                    />
                  );
                }
              })}

        <PageFooter />
      </div>

      {side === "Right" ? <VerticalMenu side={side} /> : null}
    </div>
  );
};

export default LeftMenuTemplate;
