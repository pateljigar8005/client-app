import { useEffect, useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Menu, Search, X, ChevronRight, ChevronDown } from "react-feather";
import { setSelectedLang } from "./../../redux/actions/index";
import Logo from "../../images/packimpex-logo-colour.png";

const TopNavBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;
  const [toggleBlock, handleToggleBlock] = useState(false);
  const [langToggle, handleLangToggle] = useState(false);
  const [menuList, setMenuList] = useState([]);
  const languageMenu = useSelector((state) => state.siteReducer)?.languageList;
  const selectedLang = useSelector(
    (state) => state?.siteReducer
  )?.selectedLanguage;
  const siteMenuList = useSelector(
    (state) => state?.siteReducer
  )?.siteMenuItems;
  const sitePageData = useSelector((state) => state?.siteReducer)?.sitesAllData;

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
    <div className="w-full md:flex justify-center sticky top-0 bg-white p-2 shadow-xl z-10">
      <div className="w-full md:w-4/5 flex justify-between items-center">
        <div
          className="block md:hidden"
          onClick={() => handleToggleBlock(!toggleBlock)}
        >
          {toggleBlock ? <X /> : <Menu />}
        </div>

        <div className="">
          <img
            src={Logo?.src}
            className="h-10 md:h-full"
            // width={250}
            // height={110}
            alt="logo"
          />
        </div>

        <div className="md:space-y-5">
          {/* <div className="flex items-center gap-2 md:gap-5 justify-end">
            <Search className="text-primary" size={20} />
            <button className="bg-primary text-white py-2 md:py-4 px-5 md:px-20">
              Search
            </button>
          </div> */}

          <div className="hidden md:flex gap-5 items-center">
            {menuBlock}
            {translatePageBlock}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
