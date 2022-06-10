import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import VerticalHeader from "./header";
import { GitPullRequest } from "react-feather";

const VerticalMenu = ({ side }) => {
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;
  const selectedLang = useSelector(
    (state) => state?.siteReducer
  )?.selectedLanguage;
  const siteMenuList = useSelector(
    (state) => state?.siteReducer
  )?.siteMenuItems;
  const [height, setHeight] = useState("");
  const [menuList, setMenuList] = useState([]);
  const shadowRef = useRef(null);

  // ** Scroll Menu
  const scrollMenu = (container) => {
    if (shadowRef && container.scrollTop > 0) {
      if (!shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.add("d-block");
      }
    } else {
      if (shadowRef.current.classList.contains("d-block")) {
        shadowRef.current.classList.remove("d-block");
      }
    }
  };

  if (typeof window !== "undefined") {
    window.onresize = (event) => {
      setHeight(event?.target?.innerHeight);
    };
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      let height = window.screen.height;
      setHeight(height);
    }
    // eslint-disable-next-line
  }, []);

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
    <div
      className={`main-menu menu-accordion shadow-xl menu-light ${
        side === "Left" ? "vertical-left-menu" : "vertical-right-menu"
      }`}
      style={{ height: height + "px" }}
    >
      <VerticalHeader />

      <PerfectScrollbar
        className="main-menu-content"
        options={{ wheelPropagation: false }}
        onScrollY={(container) => scrollMenu(container)}
      >
        <ul className="navigation navigation-main">
          {menuList?.map((x, index) => {
            return (
              <li key={index} className="nav-item">
                <Link
                  href={`/${site_id}/${country_id.toLowerCase()}/${
                    selectedLang?.tag
                  }/${x.url}`}
                >
                  <a
                    className={
                      page_id === x?.url
                        ? `block text-primary`
                        : "text-gray-500 block"
                    }
                  >
                    {x?.name}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </PerfectScrollbar>
    </div>
  );
};

export default VerticalMenu;

// yoursupport@gtpl.net
