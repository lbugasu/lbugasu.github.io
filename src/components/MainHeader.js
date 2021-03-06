import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import styled from "styled-components";
import LightDarkToggle from "./LightDarkToggle";

import $ from "jquery";

const MainHeader = () => {
  /**
   * JQuery function to listen to when a user scrolls
   */
  useEffect(() => {
    let menuItem = document.getElementById("floating-menu");
    $(window).scroll(function () {
      var currentScroll = $(window).scrollTop(); // get current position
      // Only show the icon if the window width is greater than 700px
      if ($(window).width() > 700) {
        if (currentScroll >= 200) {
          menuItem.style.visibility = "visible";

          // menuItem.style.display = "block";
          // apply position: fixed if you
          if (menuItem.classList.contains("fade-out"))
            $(menuItem).removeClass("fade-out");
          $(menuItem).addClass("fade-in");
          menuItem.style.opacity = "1 ";
        } else {
          // apply position: static
          // if you scroll above it
          if (menuItem.classList.contains("fade-in"))
            $(menuItem).removeClass("fade-in");
          $(menuItem).addClass("fade-out");
          menuItem.style.opacity = "0 ";
          menuItem.style.visibility = "hidden";
        }
      }
    });
  });

  const Header = styled.div`
    border-bottom: 1px solid var(--hr);
  `;
  const Title = styled.div`
    width: 50%;
    display: inline-block;
    font-weight: 600;
    font-family: "Etoile";
    font-size: 150%;
    margin: 0;
    @media only screen and (max-width: 900px) {
      font-size: 125%;

      width: 65%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 125%;

      width: 75%;
    }
  `;
  const Menu = styled.div`
    width: 49%;
    display: inline-block;
    font-family: "Whirly Bats";
    text-align: right;
    font-size: 150%;
    @media only screen and (max-width: 900px) {
      font-size: 125%;

      width: 35%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 150%;
      width: 25%;
    }
  `;
  const Up = styled.span`
    font-size: 80%;
    line-height: 12pt;
  `;
  const Floating = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    right: 0;
    position: fixed;
    float: right;
    padding-right: 8.25%;
    visibility: hidden;
    ${"" /* display: none; */}
    opacity: 0;
  `;
  const FloatingMenu = styled.div`
    display: inline-block;
    font-family: "Whirly Bats";
    text-align: right;
    font-size: 150%;
    @media only screen and (max-width: 900px) {
      font-size: 90%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 80%;
    }
    :hover {
      cursor: pointer;
    }
  `;

  return (
    <>
      <Header id={"up"}>
        <Title>
          <Link to="/">LAURENCE ININDA</Link>
        </Title>
        <Menu>
          <LightDarkToggle />
          <span
            onClick={() => {
              let menu = document.querySelector("div.mainmenu");
              $(menu).css("display", "block");
            }}
            className="specialChar showHover"
          >
            I
          </span>
        </Menu>
      </Header>
      <Floating id="floating-menu">
        <FloatingMenu>
          <Up>
            <HashLink
              smooth
              to={`#up`}
              onClick={() => {
                let menuItem = document.getElementById("floating-menu");

                if (menuItem.classList.contains("fade-in"))
                  $(menuItem).removeClass("fade-in");
                menuItem.style.display = "none";
              }}
            >
              ⍙{" "}
            </HashLink>
          </Up>
          <span
            onClick={() => {
              let menu = document.querySelector("div.mainmenu");
              $(menu).css("display", "block");
            }}
            className="specialChar showHover"
          >
            I
          </span>
        </FloatingMenu>
      </Floating>
    </>
  );
};
export default MainHeader;
