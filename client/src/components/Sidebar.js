import React, { useEffect, useState } from "react";

import Logo from "../assets/logo.svg";
import Moon from "../assets/icon-moon.svg";
import Portrait from "../assets/image-avatar.jpg";
import Sun from "../assets/icon-sun.svg";

import { setTheme } from "../utils/themes";

const Sidebar = () => {
  let theme = localStorage.getItem("theme");

  const [moon, setMoon] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setMoon(false);
    } else if (localStorage.getItem("theme") === "theme-light") {
      setMoon(true);
    }
  }, [theme]);

  const onClick = (e) => {
    if (localStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else {
      setTheme("theme-dark");
    }
    e.target.classList.add("side-bar__moon--transition");

    setTimeout(() => {
      setMoon(!moon);
    }, 250);

    setTimeout(() => {
      e.target.classList.remove("side-bar__moon--transition");
    }, 500);
  };

  const renderImg = () => {
    return moon ? (
      <img onClick={onClick} className='side-bar__moon' src={Moon} alt='moon' />
    ) : (
      <img onClick={onClick} className='side-bar__moon' src={Sun} alt='moon' />
    );
  };

  return (
    <div className='side-bar'>
      <div className='side-bar__icon-bg'>
        <img className='side-bar__logo' src={Logo} alt='logo' />
      </div>

      <div className='side-bar__moon-container'>{renderImg()}</div>

      <img className='side-bar__portrait' src={Portrait} alt='' />
    </div>
  );
};

export default Sidebar;
