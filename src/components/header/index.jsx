import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LogOut, Moon, Star, User } from "react-feather";

import { useStateContext } from "../../context/ContextProvider";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    document.body?.classNameList?.remove("menu-opened");
    return () => {
      document.body.classNameName = "";
    };
  }, []);
  const { token, user, setUser, setToken } = useStateContext();
  console.log(user);
  const logout = () => {
    // localStorage.removeItem("ACCESS_TOKEN")
    setToken();
    setUser({});
    // window.location.reload();
  };
  // change header background on scroll
  const [navbar, setNavbar] = useState(false);
  // Mobile Menu toggle
  const [mobileSubMenu, setMobileSubMenu] = useState(false);
  const [mobileSubMenu2, setMobileSubMenu2] = useState(false);
  const [mobileSubMenu22, setMobileSubMenu22] = useState(false);
  const [mobileSubMenu3, setMobileSubMenu3] = useState(false);
  const [mobileSubMenu32, setMobileSubMenu32] = useState(false);
  const [mobileSubMenu4, setMobileSubMenu4] = useState(false);
  const [mobileSubMenu42, setMobileSubMenu42] = useState(false);
  const [mobileSubMenu43, setMobileSubMenu43] = useState(false);
  const [mobileSubMenu5, setMobileSubMenu5] = useState(false);

  const openMobileMenu = () => {
    document.body?.classNameList?.add("menu-opened");
  };
  const profile = useRef();
  useOnClickOutside(profile, () => setShowProfile(false));
  const hideMobileMenu = () => {
    document.body?.classNameList?.remove("menu-opened");
  };
  const profileClick = (e) => {
    e.preventDefault();
    setShowProfile(!showProfile);
  };

  const openMobileSubMenu = (e) => {
    e.preventDefault();
    setMobileSubMenu(!mobileSubMenu);
  };
  const openMobileSubMenu2 = (e) => {
    e.preventDefault();
    setMobileSubMenu2(!mobileSubMenu2);
  };
  const openMobileSubMenu22 = (e) => {
    e.preventDefault();
    setMobileSubMenu22(!mobileSubMenu22);
  };
  const openMobileSubMenu3 = (e) => {
    e.preventDefault();
    setMobileSubMenu3(!mobileSubMenu3);
  };
  const openMobileSubMenu32 = (e) => {
    e.preventDefault();
    setMobileSubMenu32(!mobileSubMenu32);
  };
  const openMobileSubMenu4 = (e) => {
    e.preventDefault();
    setMobileSubMenu4(!mobileSubMenu4);
  };
  const openMobileSubMenu42 = (e) => {
    e.preventDefault();
    setMobileSubMenu42(!mobileSubMenu42);
  };
  const openMobileSubMenu43 = (e) => {
    e.preventDefault();
    setMobileSubMenu43(!mobileSubMenu43);
  };
  const openMobileSubMenu5 = (e) => {
    e.preventDefault();
    setMobileSubMenu5(!mobileSubMenu5);
  };

  const changeHeaderBackground = () => {
    if (window.scrollY >= 90) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeHeaderBackground);
  return (
    <header className="header">
      <div className="header-fixed">
        <nav className="navbar navbar-expand-lg header-nav scroll-sticky">
          <div className="container">
            <div className="navbar-header">
              <a id="mobile_btn" href="javascript:void(0);">
                <span className="bar-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </a>
              <a href="index.html" className="navbar-brand logo">
                <img
                  src="https://themusichall.fr/assets/logo.svg"
                  className="img-fluid"
                  alt="Logo"
                  width="70px"
                />
              </a>
            </div>
            <div className="main-menu-wrapper"></div>
            <ul className="nav header-navbar-rht">
              <li className="nav-item">
                <Link to="/course-list">Donner des cours</Link>
              </li>
              <li className="nav-item">
                <Link to="/course-list">Nos cours</Link>
              </li>
              <li className="nav-item">
                <Link to="/instructor-list">Nos professeurs</Link>
              </li>
              {token ? (
                !user ? (
                  "Chargement"
                ) : (
                  <li className="nav-item user-nav">
                    <Link
                      to="#"
                      className={
                        showProfile ? "dropdown-toggle show" : "dropdown-toggle"
                      }
                      data-bs-toggle="dropdown"
                      onClick={profileClick}
                    >
                      <span className="user-img">
                        <img src={user?.photo} alt="" />
                        <span className="status online"></span>
                      </span>
                    </Link>
                    <div
                      ref={profile}
                      className={
                        showProfile
                          ? "users dropdown-menu dropdown-menu-right show modalPosition"
                          : "users dropdown-menu dropdown-menu-right"
                      }
                      data-popper-placement="bottom-end"
                    >
                      <div className="user-header">
                        <div className="avatar avatar-sm">
                          <img
                            src={user?.photo}
                            alt="User Image"
                            className="avatar-img rounded-circle"
                          />
                        </div>
                        <div className="user-text">
                          <h6>{user?.first_name + " " + user?.last_name}</h6>
                          <p className="text-muted text mb-0">{user?.role}</p>
                        </div>
                      </div>
                      <Link
                        className="dropdown-item text"
                        to={
                          user?.role == "etudiant"
                            ? `/setting-edit-profile`
                            : "/profile"
                        }
                      >
                        <User
                          size={14}
                          color={"#58BBDE"}
                          className="headerIcon"
                        />{" "}
                        Profile
                      </Link>

                      <Link
                        className="dropdown-item text"
                        to="/"
                        onClick={logout}
                      >
                        <LogOut
                          size={14}
                          color={"#58BBDE"}
                          className="headerIcon"
                        />{" "}
                        Logout
                      </Link>
                    </div>
                  </li>
                )
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login">Connexion</Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link bg-black text-white rounded px-4"
                      href="login.html"
                    >
                      S&apos;inscrire
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
