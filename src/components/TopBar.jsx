import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logoDark from "../assets/logoDark.png";
import logoLight from "../assets/logoLight.png";
import logoDarkM from "../assets/logoDarkM.png";
import logoLightM from "../assets/logoLightM.png";

const Container = styled.div`
  box-shadow: 20px 20px 50px rgba(0, 0, 0, 0.7);
  border-top: 1px solid rgba(255, 255, 255, 0.5);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  z-index: 1;
  background: ${(props) =>
    props.themeCurrent === "dark"
      ? `rgba(${props.theme.bodyRgba},.7)`
      : `rgba(${props.theme.bodyRgba},.4)`};
  padding: 0px 30px;
  margin: 30px 40px 0;
  color: ${(props) => props.theme.main};
  border-radius: 30px;
  height: 120px;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media (max-width: 475px) {
    padding: 0px 15px;
    margin: 20px 15px;
  }
`;

const Left = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.main};
  text-decoration: none;
  img {
    height: 55%;
    @media (max-width: 1000px) {
      height: 45%;
    }
    @media (max-width: 750px) {
      height: 75%;
    }
  }
`;
const Center = styled.form`
  width: 25vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: ${(props) => `rgba(${props.theme.mainRgba},0.1)`};
  padding: 15px 20px;
  border-radius: 30px;

  @media (max-width: 1000px) {
    display: none;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 17vw;
    color: ${(props) => props.theme.main};
    &::placeholder {
      color: ${(props) => `rgba(${props.theme.mainRgba},0.4)`};
    }
  }
  button {
    background-color: transparent;
    border: none;
    outline: none;
    color: ${(props) => props.theme.main};
  }
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .theme {
    height: 50px;
    width: 50px;
    margin-right: 30px;
    background-color: ${(props) => `rgba(${props.theme.mainRgba},0.1)`};
    color: ${(props) => props.theme.main};
    box-shadow: ${(props) =>
      props.shadowColor === "dark"
        ? `inset -1px -1px 2px 1px ${props.theme.text}`
        : `inset 0px 1px 2px 0.01px ${props.theme.main}`};
    box-sizing: border-box;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .iconContainer {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .icon {
      width: 40%;
      height: 40%;
    }
  }
  .profile {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid ${(props) => props.theme.main};
    box-sizing: border-box;
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 425px) {
    .theme {
      height: 30px;
      width: 30px;
      margin-right: 10px;
    }
    .profile {
      height: 40px;
      width: 40px;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;

const TopBar = ({ themeCurrent, setThemeDark }) => {
  let mobile =
    (window.innerWidth > 0 ? window.innerWidth : window.screen.width) < 750;
  return (
    <Container themeCurrent={themeCurrent}>
      <Left to="/">
        <img
          src={
            themeCurrent === "dark"
              ? mobile
                ? logoDarkM
                : logoDark
              : mobile
              ? logoLightM
              : logoLight
          }
          alt="logo"
        />
      </Left>
      <Center>
        <input type="text" placeholder="Search..." />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </Center>
      <Right shadowColor={themeCurrent}>
        <span className="theme" onClick={() => setThemeDark((p) => !p)}>
          <motion.span
            className="iconContainer"
            transition={{ duration: 0.3 }}
            whileTap={{ rotate: [0, 360, 360, 0], scale: [1, 0, 1] }}
          >
            {themeCurrent === "dark" ? (
              <FontAwesomeIcon className="icon" icon={faSun} />
            ) : (
              <FontAwesomeIcon className="icon" icon={faMoon} />
            )}
          </motion.span>
        </span>
        <div className="profile">
          <img
            src="https://media.istockphoto.com/photos/protective-antiviral-mask-on-the-cats-face-protective-face-mask-for-picture-id1214907564?k=20&m=1214907564&s=612x612&w=0&h=PmjmDkPCAqE0aKz3mr_uzfJ0q40FUWQLrZ1Ugy7dMPk="
            alt=""
          />
        </div>
      </Right>
    </Container>
  );
};

export default TopBar;
