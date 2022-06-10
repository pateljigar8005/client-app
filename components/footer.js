import React, { useEffect, useState } from "react";
import { Facebook, Linkedin } from "react-feather";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import FooterCard from "./FooterCard";

const PageFooter = () => {
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;
  const selectedLang = useSelector(
    (state) => state?.siteReducer
  )?.selectedLanguage;
  const siteMenuList = useSelector(
    (state) => state?.siteReducer
  )?.siteFooterMenuItems;
  const [menuList, setMenuList] = useState([]);

  const groupedMenuTitles = menuList.reduce((group, product) => {
    const { groupTitle } = product;
    group[groupTitle] = group[groupTitle] ?? [];
    group[groupTitle].push(product);
    return group;
  }, {});

  const menuColumns = Object.keys(groupedMenuTitles).filter(
    (x) => x !== "undefined"
  );

  const footerContentTitle =
    groupedMenuTitles["undefined"] &&
    groupedMenuTitles["undefined"].filter((j) => j?.url === undefined);
  const socialContent =
    footerContentTitle?.length > 0 ? footerContentTitle[0] : null;

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
    <div className="bg-secondary flex justify-center py-10 text-white px-5 md:px-0">
      <div className="w-full md:w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="col-span-1">
            <div className="">
              {/* <img src="/src/images/packimpex-logo-colour-white.png" alt="" /> */}
              <br />
              <h1 className="font-bold text-lg ">
                {footerContentTitle?.length > 0
                  ? footerContentTitle[0]?.title
                  : null}
              </h1>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {menuColumns &&
                menuColumns?.map((x, index) => {
                  return (
                    <div className="" key={index}>
                      <h1 className="uppercase text-primary">{x}</h1>

                      <br />
                      <div className="space-y-3 text-sm">
                        {groupedMenuTitles[x].map((item, i) => {
                          return (
                            <Link
                              href={`/${site_id}/${country_id.toLowerCase()}/${
                                selectedLang?.tag
                              }/${item?.url}`}
                              key={i}
                            >
                              <a className="hover:text-primary hover:underline block">
                                {item?.name}
                              </a>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="col-span-1">
            {/* LINKEDIN */}
            <FooterCard
              title={socialContent?.linkedInTitle || "LinkedIn"}
              followText={socialContent?.linkedInFollowText || "Follow Us"}
              icon={<Linkedin />}
              socialURL={socialContent?.linkedInURL || ""}
            />

            <FooterCard
              title={socialContent?.facebookTitle || "Facebook"}
              icon={<Facebook />}
              followText={socialContent?.facebookFollowText || "Follow Us"}
              socialURL={socialContent?.facebookURL || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
