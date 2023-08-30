import React from "react";
import "./Header.scss";
import HeroImg from "../../assets/images/header.jpg";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">
          Discover the essence of brilliance
        </span>
        <span className="headerTitleLg">Welcome to BlogBits</span>
      </div>
      <div className="headerImg">
        <img src= {HeroImg} alt="header"/>
      </div>
    </div>
  );
};

export default Header;
