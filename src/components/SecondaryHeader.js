import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SecondaryHeader = () => {
  const Menu = styled.div`
    font-family: "Crafter";
    font-size: 85%;
    text-align: center;
    padding: 0.5% 0 0.5% 0;
    margin: 0 20% 0 20%;
    width: 60%;
    border-bottom: 1px solid #47261b;
    @media only screen and (max-width: 900px) {
      font-size: 90%;
      width: 70%;
      margin: 2% 15% 1% 15%;
    }
    @media only screen and (max-width: 600px) {
      font-size: 80%;
      width: 95%;
      margin: 2% 2.5% 2% 2.5%;
    }
  `;
  return (
    <Menu>
      <Link to="/writing-section/poetry">POETRY</Link> • <Link>FICTION</Link> •{" "}
      <Link>DEV</Link> • <Link>VAULT</Link>
    </Menu>
  );
};
export default SecondaryHeader;
