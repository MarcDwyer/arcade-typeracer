import React from "react";

import { ModeLink } from "../../styled-components/buttons";
import "./home.scss";
import { RouteModes } from "../../enums";

type MyLinks = {
  path: string;
  text: string;
};
export default function Homepage() {
  const links: MyLinks[] = [
    { path: `/${RouteModes.single}`, text: "Single Player" },
    { path: `/${RouteModes.multi}`, text: "Multi Player" },
  ];
  // useEffect(() => {
  //   const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //   console.log(isDark);
  // }, []);
  return (
    <div className="homepage">
      <div className="links">
        {links.map((link, i) => (
          <ModeLink key={i} to={link.path}>
            {link.text}
          </ModeLink>
        ))}
      </div>
    </div>
  );
}
