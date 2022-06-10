import React from "react";
import { ArrowRight } from "react-feather";

const FooterCard = ({ title, icon, followText, socialURL }) => {
  return (
    <div className="bg-[#484848] text-white gap-2 rounded-xl p-5 mb-5">
      <div className="flex gap-2">
        {icon}
        <span>{title}</span>
      </div>
      <br />
      <a
        href={socialURL}
        target="_blank"
        rel="noreferrer"
        className="hover:underline text-primary flex gap-2"
      >
        {followText}
        <ArrowRight />
      </a>
    </div>
  );
};

export default FooterCard;
