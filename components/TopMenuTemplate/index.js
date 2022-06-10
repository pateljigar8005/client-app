import React from "react";
import { useRouter } from "next/router";
import TopNavbar from "./TopNavbar";
import PageFooter from "../footer";
import Container from "../Containter";
import ContentSection from "../ContentSection";
import SliderContainer from "../SliderContainer";
import ApiData from "../ApiData";
import { ProductListContainer } from "../ProductListContainer";

const TopMenuTemplate = ({ filteredPageData }) => {
  const router = useRouter();
  const { site_id, country_id, lang_id, page_id } = router.query;
  return (
    <div>
      <TopNavbar />

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
  );
};

export default TopMenuTemplate;
