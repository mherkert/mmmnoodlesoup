import React from "react";
import { StaticImage } from "gatsby-plugin-image";
const Logo = () => {
  return (
    <div className="flex items-end h-12">
      <StaticImage
        src="../images/logo.png"
        alt="Mmm NoodleSoup Logo"
        width={48}
        height={48}
        style={{ minWidth: "48px" }}
      />
      <div className="font-brand text-secondary-light pl-1">
        <div className="text-xl relative top-4 left-8 font-bold">Mmm</div>
        <div className="text-4xl font-bold">NoodleSoup</div>
      </div>
    </div>
  );
};

export default Logo;
