import React from "react";

import { ModeLink } from "../../styled-components/buttons";
import { Theme } from "../../themes/theme_colors.";
import "./home.scss";
import { RouteModes } from "../../App";

type MyLinks = {
  path: string;
  text: string;
};
export default function Homepage() {
  const links: MyLinks[] = [
    { path: `/${RouteModes.single}`, text: "Single Player" },
    { path: `/${RouteModes.multi}`, text: "Multi Player" },
  ];

  return (
    <div className="homepage">
      <div className="links">
        {links.map((link, i) => (
          <ModeLink
            key={i}
            to={link.path}
            bordercolor={Theme.btnColor}
          >
            {link.text}
          </ModeLink>
        ))}
      </div>
    </div>
  );
}
