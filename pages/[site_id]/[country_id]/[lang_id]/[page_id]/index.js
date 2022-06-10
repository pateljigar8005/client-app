import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { URLS } from "../../../../../configs/urls";
import TopMenuTemplate from "../../../../../components/TopMenuTemplate";
import LeftMenuTemplate from "../../../../../components/LeftMenuTemplate";
import {
  setSiteAllData,
  setSelectedLang,
  setLanguageList,
  setSiteMenuItems,
  setFootermenuItems,
  saveAllPagesContent,
} from "../../../../../redux/actions/index";

export async function getServerSideProps({ query }) {
  const { site_id, country_id, lang_id, page_id } = query;
  const response = await axios.get(
    URLS.baseURL + URLS.getAllDataSite + site_id
  );

  let redirection_path;
  let LanguageData;
  let selectedLanguage;
  let menuData = [];
  let footerMenuData = [];
  let pageContentData;
  let countryLangugae;

  const countryVal = response.data.Data.country_wise_data
    .map((x) => Object.keys(x)[0])
    .includes(country_id.toUpperCase())
    ? country_id
    : response.data.Data.country_wise_data
        .map((x) => Object.keys(x)[0])[0]
        .toLowerCase();

  if (site_id) {
    const country = response.data.Data.country_wise_data.filter((o) =>
      o.hasOwnProperty(countryVal.toUpperCase())
    )[0];

    const pageDatas =
      response.data?.Data?.country_wise_data?.length > 0
        ? response.data?.Data?.country_wise_data
            .filter((x) => Object.keys(x)[0] !== undefined)
            .filter(
              (x) =>
                Object.keys(x)[0].toLowerCase() === countryVal.toLowerCase()
            )[0][String(countryVal).toUpperCase()]
        : [];

    pageContentData =
      response.data?.Data?.country_wise_data?.length > 0
        ? response.data?.Data?.country_wise_data
            .filter((x) => Object.keys(x)[0] !== undefined)
            .filter(
              (x) =>
                Object.keys(x)[0].toLowerCase() === countryVal.toLowerCase()
            )[0][countryVal.toUpperCase()]
        : [];

    const countryMenu =
      response.data?.Data?.menu?.length > 0
        ? response.data?.Data?.menu.filter(
            (x) => Object.keys(x)[0].toLowerCase() === countryVal.toLowerCase()
          )
        : [];

    menuData =
      countryMenu?.length > 0
        ? countryMenu[0][String(countryVal).toUpperCase()]
        : [];

    if (response.data?.Data?.footer_menu?.length > 0) {
      const countryFooter = response.data?.Data?.footer_menu.filter(
        (x) => Object.keys(x)[0].toLowerCase() === countryVal.toLowerCase()
      );
      footerMenuData =
        countryFooter?.length > 0
          ? countryFooter[0][countryVal.toUpperCase()]
          : [];
    }

    const contentToShow =
      pageDatas?.length > 0 ? pageDatas[0][lang_id.toLowerCase()] : {};
    const showPage_id =
      contentToShow?.length > 0 ? contentToShow[0]?.address : "no-page";

    const langs = Object.keys(country[Object.keys(country)[0]][0]);

    const langRes = await axios.get(URLS.baseURL + URLS.getAllLanguages);

    if (langRes.status === 200) {
      const finalData = langRes.data?.Data.filter((x) => {
        return langs.includes(x?.code);
      }).map((x) => {
        return {
          title: x?.name,
          tag: x?.code,
        };
      });

      countryLangugae =
        finalData?.length > 0
          ? finalData.filter((l) => l.tag === lang_id.toLowerCase()).length > 0
            ? lang_id.toLowerCase()
            : finalData[0]?.tag.toLowerCase()
          : "en";

      const showVal = finalData.filter((x) => x.tag === lang_id.toLowerCase());
      selectedLanguage = showVal[0];
      LanguageData = finalData;

      redirection_path = `/${site_id}/${countryVal.toLowerCase()}/${countryLangugae}/${showPage_id}`;
    }
  }

  const returnVall = {};
  if (page_id === "no-page") {
    returnVall["redirect"] = {
      destination: redirection_path,
    };
  }

  if (country_id !== countryVal) {
    returnVall["redirect"] = {
      destination: redirection_path,
    };
  }

  if (lang_id.toLowerCase() !== countryLangugae) {
    returnVall["redirect"] = {
      destination: redirection_path,
    };
  }

  returnVall["props"] = {
    siteDetails: response.data.Data,
    langugaeList: LanguageData,
    selectedLangVal: selectedLanguage,
    menuData: menuData,
    footerMenuData: footerMenuData,
    pageContentData: pageContentData,
  };

  return returnVall;
}

const PageID = ({
  siteDetails,
  langugaeList,
  selectedLangVal,
  menuData,
  footerMenuData,
  pageContentData,
}) => {
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;
  const dispatch = useDispatch();

  const selectedLang = useSelector((state) => state?.siteReducer)
    ?.selectedLanguage?.tag;
  const pageContentDataValue = useSelector(
    (state) => state?.siteReducer
  )?.pagesContent;
  const SiteThemeData = useSelector((state) => state?.siteReducer)?.sitesAllData
    ?.theme;

  const contentToShow =
    pageContentDataValue[0] && pageContentDataValue[0][selectedLang];
  const filteredPageData =
    contentToShow?.length > 0
      ? contentToShow.filter((x) => x?.address === page_id)[0]
      : null;

  const menuPosition = SiteThemeData?.menu_position === "left" ? 2 : 1;

  useEffect(() => {
    dispatch(setSiteAllData(siteDetails));
    dispatch(setLanguageList(langugaeList));
    dispatch(setSelectedLang(selectedLangVal));
    dispatch(setSiteMenuItems(menuData));
    dispatch(setFootermenuItems(footerMenuData));
    dispatch(saveAllPagesContent(pageContentData));
    // eslint-disable-next-line
  }, [
    siteDetails,
    langugaeList,
    selectedLangVal,
    menuData,
    footerMenuData,
    pageContentData,
  ]);

  useEffect(() => {
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [page_id]);

  return (
    <div>
      <Head>
        <title>
          {filteredPageData?.title
            ? filteredPageData?.title
            : site_id === "no-page"
            ? "Page Not Found"
            : "Loading"}
        </title>
      </Head>

      {menuPosition === 2 ? (
        <LeftMenuTemplate side="Left" filteredPageData={filteredPageData} />
      ) : (
        <TopMenuTemplate filteredPageData={filteredPageData} />
      )}
    </div>
  );
};

export default PageID;
