import React, { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setSiteAllData,
  setSelectedLang,
  setLanguageList,
  setSiteMenuItems,
  setFootermenuItems,
  saveAllPagesContent,
} from "../../redux/actions/index";
import { URLS } from "../../configs/urls";

export async function getServerSideProps({ query }) {
  const { site_id } = query;
  const response = await axios.get(
    URLS.baseURL + URLS.getAllDataSite + site_id
  );

  let redirection_path;
  let LanguageData;
  let selectedLanguage;
  let menuData = [];
  let footerMenuData = [];
  let pageContentData;

  const countryLangugae =
    LanguageData?.length > 0
      ? LanguageData.filter((l) => l.tag === lang_id.toLowerCase()).length > 0
        ? lang_id.toLowerCase()
        : LanguageData[0]?.tag.toLowerCase()
      : "en";

  if (site_id) {
    const userResponse = await axios.get(URLS.countryService);
    if (userResponse.status === 200) {
      const countryData = userResponse.data;

      const countryVal = response.data.Data.country_wise_data
        .map((x) => Object.keys(x)[0])
        .includes(countryData.country_code.toUpperCase())
        ? countryData.country_code.toLowerCase()
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

      menuData =
        response.data?.Data?.menu?.length > 0
          ? response.data?.Data?.menu.filter(
              (x) =>
                Object.keys(x)[0].toLowerCase() === countryVal.toLowerCase()
            )[0][countryVal.toUpperCase()]
          : [];

      if (response.data?.Data?.footer_menu?.length > 0) {
        footerMenuData =
          response.data?.Data?.footer_menu?.length > 0
            ? response.data?.Data?.footer_menu.filter(
                (x) =>
                  Object.keys(x)[0].toLowerCase() === countryVal.toLowerCase()
              )[0][countryVal.toUpperCase()]
            : [];
      }

      const contentToShow = pageDatas?.length > 0 ? pageDatas[0]["en"] : {};
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

        const showVal = finalData.filter((x) => x.tag === "en");
        selectedLanguage = showVal[0];
        LanguageData = finalData;
      }

      redirection_path = `/${site_id}/${countryVal.toLowerCase()}/${countryLangugae}/${showPage_id}`;
    }
  }
  return {
    redirect: {
      permanant: true,
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

const SiteId = ({
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
        <title>Country Loading</title>
      </Head>
      Country Loading...
    </div>
  );
};

export default SiteId;
