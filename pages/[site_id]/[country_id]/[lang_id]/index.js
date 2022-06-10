import React from "react";
import { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { URLS } from "../../../../configs/urls";
import {
  setSiteAllData,
  setSelectedLang,
  setLanguageList,
  setSiteMenuItems,
  setFootermenuItems,
  saveAllPagesContent,
} from "../../../../redux/actions/index";

export async function getServerSideProps({ query }) {
  const { site_id, country_id, lang_id } = query;
  const response = await axios.get(
    URLS.baseURL + URLS.getAllDataSite + site_id
  );

  let redirection_path;
  let LanguageData;
  let selectedLanguage;
  let menuData = [];
  let footerMenuData = [];
  let pageContentData;

  if (site_id) {
    const countryVal = response.data.Data.country_wise_data
      .map((x) => Object.keys(x)[0])
      .includes(country_id.toUpperCase())
      ? country_id
      : response.data.Data.country_wise_data
          .map((x) => Object.keys(x)[0])[0]
          .toLowerCase();

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
            )[0][countryVal.toUpperCase()]
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
      countryMenu?.length > 0 ? countryMenu[0][countryVal.toUpperCase()] : [];

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

      const showVal = finalData.filter((x) => x.tag === lang_id.toLowerCase());
      selectedLanguage = showVal[0];
      LanguageData = finalData;

      redirection_path = `/${site_id}/${countryVal.toLowerCase()}/${lang_id.toLowerCase()}/${showPage_id}`;
    }
  }
  return {
    redirect: {
      destination: redirection_path,
    },
    props: {
      siteDetails: response.data.Data,
      langugaeList: LanguageData,
      selectedLang: selectedLanguage,
      menuData: menuData,
      footerMenuData: footerMenuData,
      pageContentData: pageContentData,
    },
  };
}

const LanguageId = ({
  siteDetails,
  langugaeList,
  selectedLang,
  menuData,
  footerMenuData,
  pageContentData,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSiteAllData(siteDetails));
    dispatch(setLanguageList(langugaeList));
    dispatch(setSelectedLang(selectedLang));
    dispatch(setSiteMenuItems(menuData));
    dispatch(setFootermenuItems(footerMenuData));
    dispatch(saveAllPagesContent(pageContentData));
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Head>
        <title>Page Loading</title>
      </Head>
      Page Loading...
    </div>
  );
};

export default LanguageId;
