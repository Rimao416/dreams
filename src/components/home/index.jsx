import React, { useState } from "react";
import Header from "../header";
import {
  bannerimg,
  Become1,
  Become2,
  CertificateIcon,
  Course1,
  Course2,
  Course3,
  Course4,
  Course5,
  Course6,
  CourseIcon,
  GratuateIcon,
  Icon01,
  Icon02,
  Icon03,
  Icon04,
  Icon1,
  Icon10,
  Icon12,
  Icon13,
  Icon14,
  Icon15,
  Icon16,
  Icon17,
  Icon18,
  Icon2,
  Icon7,
  Icon8,
  Icon9,
  Join,
  PencilIcon,
  Share,
  User1,
  User2,
  User3,
  User4,
  User5,
  User6,
} from "../imagepath";
import TopCategory from "./slider/topCategory";
import Loginbg from "../../assets/img/banner.png";
import TrendingCourse from "./slider/trendingCourse";
import Companies from "./slider/companies";
import BgBanner1 from "../../assets/img/bg-banner-01.png";
import BgBanner2 from "../../assets/img/bg-banner-02.png";
import UserLove from "../../assets/img/user-love.jpg";
import Blog from "./slider/blog";
import Footer from "../footer";
import Testimonial from "./slider/testimonial";
import Select from "react-select";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import CountUp from "react-countup";

const options = [
  { label: "Category", value: "Category" },
  { label: "Angular", value: "Angular" },
  { label: "Node Js", value: "Node Js" },
  { label: "React", value: "React" },
  { label: "Python", value: "Python" },
];

export const Home = () => {
  const [setValue] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isActivetwo, setIsActivetwo] = useState(false);
  const [isActivethree, setIsActivethree] = useState(false);
  const [isActivefour, setIsActivefour] = useState(false);
  const [isActivefive, setIsActivefive] = useState(false);
  const [isActivesix, setIsActivesix] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };
  const toggleClasstwo = () => {
    setIsActivetwo(!isActivetwo);
  };
  const toggleClassthree = () => {
    setIsActivethree(!isActivethree);
  };
  const toggleClassfour = () => {
    setIsActivefour(!isActivefour);
  };
  const toggleClassfive = () => {
    setIsActivefive(!isActivefive);
  };
  const toggleClasssix = () => {
    setIsActivesix(!isActivesix);
  };

  const formatValue = (value) => `${Math.floor(value)}`;

  const style = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "#FFDEDA",
      border: state.isFocused ? 0 : 0,
      paddingLeft: "5px",
      paddingTop: "5px",
      paddingBottom: "5px",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: state.isSelected ? "0" : "10px",
      fontSize: "14px",
      "&:hover": {
        border: state.isFocused ? 0 : 0,
        color: "black",
      },
      // eslint-disable-next-line no-dupe-keys
      borderRadius: "50px",
      outline: "none",
    }),
    menu: (base) => ({ ...base, marginTop: "2px" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FFDEDA" : "white",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#FFDEDA",
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "black",
      transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
      transition: "250ms",
    }),
  };

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <Header />
        {/* banner */}
        <section
          className="home-slide d-flex align-items-center"
          style={{ minHeight: " 100vh", marginTop: "7%" }}
        >
          <div className="container">
            <div className="row ">
              <div className="col-md-6">
                <div className="home-slide-face aos" data-aos="fade-up">
                  <div className="home-slide-text ">
                    <h5>Put music in your life</h5>
                    <h1 className="text-black">
                      Journey Through Melodies and Emotions!
                    </h1>
                    <p>Trouvez le cours de musique parfait pour vous</p>
                    <div className="container">
                      <div className="row">
                        <Link
                          style={{ backgroundColor: "rgb(88 187 222 )" }}
                          className="col-md-4 mx-2 text-center nav-link text-white rounded py-1 px-4"
                          href="login.html"
                        >
                          S&apos;inscrire
                        </Link>
                        <Link
                          className="col-md-4 text-center nav-link border border-black font-gray rounded py-1 px-4"
                          href="login.html"
                        >
                          Donner des cours
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="girl-slide-img aos" data-aos="fade-up">
                  <img
                    style={{ marginTop: "-9.5rem" }}
                    src="https://themusichall.fr/assets/hero.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /banner */}

        {/* Home banner bottom */}
   
        {/* Home banner bottom */}

        {/* Top Category with Owl Carousel */}
        <TopCategory />
        {/* Top Category with Owl Carousel */}

        {/* What's new Featured Course */}
        <section className="section new-course">
          <div className="container">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head">
                <span>What’s New</span>
                <h2>Featured Courses</h2>
              </div>
              <div className="all-btn all-category d-flex align-items-center">
                <Link to="/course-list" className="btn btn-primary">
                  All Courses
                </Link>
              </div>
            </div>
            <div className="section-text aos" data-aos="fade-up">
              <p className="mb-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                aenean accumsan bibendum gravida maecenas augue elementum et
                neque. Suspendisse imperdiet.
              </p>
            </div>
            <div className="course-feature">
              <div className="row">
                <div className="col-lg-4 col-md-6 d-flex">
                  <div className="course-box d-flex aos" data-aos="fade-up">
                    <div className="product">
                      <div className="product-img">
                        <Link to="/course-details">
                          <img className="img-fluid" alt="" src={Course1} />
                        </Link>
                        <div className="price">
                          <h3>
                            $300 <span>$99.00</span>
                          </h3>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="course-group d-flex">
                          <div className="course-group-img d-flex">
                            <Link to="/instructor-profile">
                              <img src={User1} alt="" className="img-fluid" />
                            </Link>
                            <div className="course-name">
                              <h4>
                                <Link to="/instructor-profile">
                                  Nicole Brown
                                </Link>
                              </h4>
                              <p>Instructor</p>
                            </div>
                          </div>
                          <div className="course-share d-flex align-items-center justify-content-center">
                            <Link to="#">
                              <i
                                onClick={toggleClass}
                                className={
                                  isActive
                                    ? "fa-regular fa-heart fa-solid"
                                    : "fa-regular fa-heart "
                                }
                              />
                            </Link>
                          </div>
                        </div>
                        <h3 className="title instructor-text">
                          <Link to="/course-details">
                            Information About UI/UX Design Degree
                          </Link>
                        </h3>
                        <div className="course-info d-flex align-items-center">
                          <div className="rating-img d-flex align-items-center">
                            <img src={Icon1} alt="" />
                            <p>12+ Lesson</p>
                          </div>
                          <div className="course-view d-flex align-items-center">
                            <img src={Icon2} alt="" />
                            <p>9hr 30min</p>
                          </div>
                        </div>
                        <div className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star" />
                          <span className="d-inline-block average-rating">
                            <span>4.0</span> (15)
                          </span>
                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                          <Link to="/checkout" className="btn btn-primary">
                            BUY NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex">
                  <div className="course-box d-flex aos" data-aos="fade-up">
                    <div className="product">
                      <div className="product-img">
                        <Link to="/course-details">
                          <img className="img-fluid" alt="" src={Course2} />
                        </Link>
                        <div className="price">
                          <h3>
                            $400 <span>$99.00</span>
                          </h3>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="course-group d-flex">
                          <div className="course-group-img d-flex">
                            <Link to="/instructor-profile">
                              <img src={User2} alt="" className="img-fluid" />
                            </Link>
                            <div className="course-name">
                              <h4>
                                <Link to="/instructor-profile">Jenis R.</Link>
                              </h4>
                              <p>Instructor</p>
                            </div>
                          </div>
                          <div className="course-share d-flex align-items-center justify-content-center">
                            <Link to="#">
                              <i
                                onClick={toggleClasstwo}
                                className={
                                  isActivetwo
                                    ? "fa-regular fa-heart fa-solid"
                                    : "fa-regular fa-heart "
                                }
                              />
                            </Link>
                          </div>
                        </div>
                        <h3 className="title instructor-text">
                          <Link to="/course-details">
                            Wordpress for Beginners - Master Wordpress Quickly
                          </Link>
                        </h3>
                        <div className="course-info d-flex align-items-center">
                          <div className="rating-img d-flex align-items-center">
                            <img src={Icon1} alt="" />
                            <p>11+ Lesson</p>
                          </div>
                          <div className="course-view d-flex align-items-center">
                            <img src={Icon2} alt="" />
                            <p>6hr 30min</p>
                          </div>
                        </div>
                        <div className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star" />
                          <span className="d-inline-block average-rating">
                            <span>4.3</span> (15)
                          </span>
                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                          <Link to="/checkout" className="btn btn-primary">
                            BUY NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex">
                  <div className="course-box d-flex aos" data-aos="fade-up">
                    <div className="product">
                      <div className="product-img">
                        <Link to="/course-details">
                          <img className="img-fluid" alt="" src={Course3} />
                        </Link>
                        <div className="price combo">
                          <h3>FREE</h3>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="course-group d-flex">
                          <div className="course-group-img d-flex">
                            <Link to="/instructor-profile">
                              <img src={User5} alt="" className="img-fluid" />
                            </Link>
                            <div className="course-name">
                              <h4>
                                <Link to="/instructor-profile">
                                  Jesse Stevens
                                </Link>
                              </h4>
                              <p>Instructor</p>
                            </div>
                          </div>
                          <div className="course-share d-flex align-items-center justify-content-center">
                            <Link to="#">
                              <i
                                onClick={toggleClassthree}
                                className={
                                  isActivethree
                                    ? "fa-regular fa-heart fa-solid"
                                    : "fa-regular fa-heart "
                                }
                              />
                            </Link>
                          </div>
                        </div>
                        <h3 className="title instructor-text">
                          <Link to="/course-details">
                            Sketch from A to Z (2022): Become an app designer
                          </Link>
                        </h3>
                        <div className="course-info d-flex align-items-center">
                          <div className="rating-img d-flex align-items-center">
                            <img src={Icon1} alt="" />
                            <p>16+ Lesson</p>
                          </div>
                          <div className="course-view d-flex align-items-center">
                            <img src={Icon2} alt="" />
                            <p>12hr 30min</p>
                          </div>
                        </div>
                        <div className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star" />
                          <span className="d-inline-block average-rating">
                            <span>4.5</span> (15)
                          </span>
                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                          <Link to="/checkout" className="btn btn-primary">
                            BUY NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex">
                  <div className="course-box d-flex aos" data-aos="fade-up">
                    <div className="product">
                      <div className="product-img">
                        <Link to="/course-details">
                          <img className="img-fluid" alt="" src={Course4} />
                        </Link>
                        <div className="price">
                          <h3>
                            $500 <span>$99.00</span>
                          </h3>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="course-group d-flex">
                          <div className="course-group-img d-flex">
                            <Link to="/instructor-profile">
                              <img src={User4} alt="" className="img-fluid" />
                            </Link>
                            <div className="course-name">
                              <h4>
                                <Link to="/instructor-profile">
                                  Nicole Brown
                                </Link>
                              </h4>
                              <p>Instructor</p>
                            </div>
                          </div>
                          <div className="course-share d-flex align-items-center justify-content-center">
                            <Link to="#">
                              <i
                                onClick={toggleClassfour}
                                className={
                                  isActivefour
                                    ? "fa-regular fa-heart fa-solid"
                                    : "fa-regular fa-heart "
                                }
                              />
                            </Link>
                          </div>
                        </div>
                        <h3 className="title instructor-text">
                          <Link to="/course-details">
                            Learn Angular Fundamentals From beginning to advance
                            lavel
                          </Link>
                        </h3>
                        <div className="course-info d-flex align-items-center">
                          <div className="rating-img d-flex align-items-center">
                            <img src={Icon1} alt="" />
                            <p>10+ Lesson</p>
                          </div>
                          <div className="course-view d-flex align-items-center">
                            <img src={Icon2} alt="" />
                            <p>8hr 30min</p>
                          </div>
                        </div>
                        <div className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star" />
                          <span className="d-inline-block average-rating">
                            <span>4.2</span> (15)
                          </span>
                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                          <Link to="/checkout" className="btn btn-primary">
                            BUY NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex">
                  <div className="course-box d-flex aos" data-aos="fade-up">
                    <div className="product">
                      <div className="product-img">
                        <Link to="/course-details">
                          <img className="img-fluid" alt="" src={Course5} />
                        </Link>
                        <div className="price">
                          <h3>
                            $300 <span>$99.00</span>
                          </h3>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="course-group d-flex">
                          <div className="course-group-img d-flex">
                            <Link to="/instructor-profile">
                              <img src={User3} alt="" className="img-fluid" />
                            </Link>
                            <div className="course-name">
                              <h4>
                                <Link to="/instructor-profile">John Smith</Link>
                              </h4>
                              <p>Instructor</p>
                            </div>
                          </div>
                          <div className="course-share d-flex align-items-center justify-content-center">
                            <Link to="#">
                              <i
                                onClick={toggleClassfive}
                                className={
                                  isActivefive
                                    ? "fa-regular fa-heart fa-solid"
                                    : "fa-regular fa-heart "
                                }
                              />
                            </Link>
                          </div>
                        </div>
                        <h3 className="title instructor-text">
                          <Link to="/course-details">
                            Build Responsive Real World Websites with HTML5 and
                            CSS3
                          </Link>
                        </h3>
                        <div className="course-info d-flex align-items-center">
                          <div className="rating-img d-flex align-items-center">
                            <img src={Icon1} alt="" />
                            <p>13+ Lesson</p>
                          </div>
                          <div className="course-view d-flex align-items-center">
                            <img src={Icon2} alt="" />
                            <p>10hr 30min</p>
                          </div>
                        </div>
                        <div className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star" />
                          <span className="d-inline-block average-rating">
                            <span>4.0</span> (15)
                          </span>
                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                          <Link to="/checkout" className="btn btn-primary">
                            BUY NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 d-flex">
                  <div className="course-box d-flex aos" data-aos="fade-up">
                    <div className="product">
                      <div className="product-img">
                        <Link to="/course-details">
                          <img className="img-fluid" alt="" src={Course6} />
                        </Link>
                        <div className="price combo">
                          <h3>FREE</h3>
                        </div>
                      </div>
                      <div className="product-content">
                        <div className="course-group d-flex">
                          <div className="course-group-img d-flex">
                            <Link to="/instructor-profile">
                              <img src={User6} alt="" className="img-fluid" />
                            </Link>
                            <div className="course-name">
                              <h4>
                                <Link to="/instructor-profile">
                                  Stella Johnson
                                </Link>
                              </h4>
                              <p>Instructor</p>
                            </div>
                          </div>
                          <div className="course-share d-flex align-items-center justify-content-center">
                            <Link to="#">
                              <i
                                onClick={toggleClasssix}
                                className={
                                  isActivesix
                                    ? "fa-regular fa-heart fa-solid"
                                    : "fa-regular fa-heart "
                                }
                              />
                            </Link>
                          </div>
                        </div>
                        <h3 className="title instructor-text">
                          <Link to="/course-details">
                            C# Developers Double Your Coding Speed with Visual
                            Studio
                          </Link>
                        </h3>
                        <div className="course-info d-flex align-items-center">
                          <div className="rating-img d-flex align-items-center">
                            <img src={Icon1} alt="" />
                            <p>7+ Lesson</p>
                          </div>
                          <div className="course-view d-flex align-items-center">
                            <img src={Icon2} alt="" />
                            <p>7hr 30min</p>
                          </div>
                        </div>
                        <div className="rating">
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star filled" />
                          <i className="fas fa-star" />
                          <span className="d-inline-block average-rating">
                            <span>4.6</span> (15)
                          </span>
                        </div>
                        <div className="all-btn all-category d-flex align-items-center">
                          <Link to="/checkout" className="btn btn-primary">
                            BUY NOW
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* What's new Featured Course */}

        {/* Master Skills */}
        <section className="section master-skill">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12">
                <div className="section-header aos" data-aos="fade-up">
                  <div className="section-sub-head">
                    <span>What’s New</span>
                    <h2>Master the skills to drive your career</h2>
                  </div>
                </div>
                <div className="section-text aos" data-aos="fade-up">
                  <p>
                    Get certified, master modern tech skills, and level up your
                    career — whether you’re starting out or a seasoned pro. 95%
                    of eLearning learners report our hands-on content directly
                    helped their careers.
                  </p>
                </div>
                <div className="career-group aos" data-aos="fade-up">
                  <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img src={Icon01} alt="" className="img-fluid" />
                            </div>
                          </div>
                          <p>Stay motivated with engaging instructors</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img src={Icon02} alt="" className="img-fluid" />
                            </div>
                          </div>
                          <p>Keep up with in the latest in cloud</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img src={Icon03} alt="" className="img-fluid" />
                            </div>
                          </div>
                          <p>Get certified with 100+ certification courses</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex">
                      <div className="certified-group blur-border d-flex">
                        <div className="get-certified d-flex align-items-center">
                          <div className="blur-box">
                            <div className="certified-img ">
                              <img src={Icon04} alt="" className="img-fluid" />
                            </div>
                          </div>
                          <p>Build skills your way, from labs to courses</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5 col-md-12 d-flex align-items-end">
                <div className="career-img aos" data-aos="fade-up">
                  <img src={Join} alt="" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Master Skills */}

        {/* Trending Course */}
        <TrendingCourse />
        {/* Trending Course */}

        {/* Companies */}
        <section className="section lead-companies">
          <div className="container">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head feature-head text-center">
                <span>Trusted By</span>
                <h2>500+ Leading Universities And Companies</h2>
              </div>
            </div>
            <div className="lead-group aos" data-aos="fade-up">
              <Companies />
            </div>
          </div>
        </section>
        {/* Companies */}

        {/* Share knowledge */}
        <section
          className="section share-knowledge"
          style={{ backgroundImage: "url(" + BgBanner1 + ")" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="knowledge-img aos" data-aos="fade-up">
                  <img src={Share} alt="" className="img-fluid" />
                </div>
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="join-mentor aos" data-aos="fade-up">
                  <h2>Want to share your knowledge? Join us a Mentor</h2>
                  <p>
                    High-definition video is video of higher resolution and
                    quality than standard-definition. While there is no
                    standardized meaning for high-definition, generally any
                    video.
                  </p>
                  <ul className="course-list">
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Best Courses
                    </li>
                    <li>
                      <i className="fa-solid fa-circle-check" />
                      Top rated Instructors
                    </li>
                  </ul>
                  <div className="all-btn all-category d-flex align-items-center">
                    <Link to="/instructor-list" className="btn btn-primary">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Share knowledge */}

        <section
          className="section user-love"
          style={{ backgroundImage: "url(" + UserLove + ")" }}
        >
          <div className="container">
            <div className="section-header white-header aos" data-aos="fade-up">
              <div className="section-sub-head feature-head text-center">
                <span>Check out these real reviews</span>
                <h2>Users-love-us Dont take it from us.</h2>
              </div>
            </div>
          </div>
        </section>
        {/* Testimonial Carousel */}
        <Testimonial />
        {/* Testimonial Carousel */}

        {/* Become a instructor */}
        <section className="section become-instructors aos" data-aos="fade-up">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="student-mentor cube-instuctor ">
                  <h4>Become An Instructor</h4>
                  <div className="row">
                    <div className="col-lg-7 col-md-12">
                      <div className="top-instructors">
                        <p>
                          Top instructors from around the world teach millions
                          of students on Mentoring.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                      <div className="mentor-img">
                        <img className="img-fluid" alt="" src={Become2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 d-flex">
                <div className="student-mentor yellow-mentor">
                  <h4>Transform Access To Education</h4>
                  <div className="row">
                    <div className="col-lg-8 col-md-12">
                      <div className="top-instructors">
                        <p>
                          Create an account to receive our newsletter, course
                          recommendations and promotions.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div className="mentor-img">
                        <img className="img-fluid" alt="" src={Become1} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Become a instructor */}

        {/* Blog */}
        <section
          className="section latest-blog"
          style={{ backgroundImage: "url(" + BgBanner2 + ")" }}
        >
          <div className="container">
            <div className="section-header aos" data-aos="fade-up">
              <div className="section-sub-head feature-head text-center mb-0">
                <h2>Latest Blogs</h2>
                <div className="section-text aos" data-aos="fade-up">
                  <p className="mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Eget aenean accumsan bibendum gravida maecenas augue
                    elementum et neque. Suspendisse imperdiet.
                  </p>
                </div>
              </div>
            </div>
            <Blog />
            <div className="enroll-group aos" data-aos="fade-up">
              <div className="row ">
                <div className="col-lg-4 col-md-6">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img ">
                        <img src={Icon7} alt="" className="img-fluid" />
                      </div>
                    </div>
                    <div className="course-count">
                      <h3>
                        <span className="counterUp">253,085</span>
                      </h3>
                      <p>STUDENTS ENROLLED</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img ">
                        <img src={Icon8} alt="" className="img-fluid" />
                      </div>
                    </div>
                    <div className="course-count">
                      <h3>
                        <span className="counterUp">1,205</span>
                      </h3>
                      <p>TOTAL COURSES</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="total-course d-flex align-items-center">
                    <div className="blur-border">
                      <div className="enroll-img ">
                        <img src={Icon9} alt="" className="img-fluid" />
                      </div>
                    </div>
                    <div className="course-count">
                      <h3>
                        <span className="counterUp">127</span>
                      </h3>
                      <p>COUNTRIES</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lab-course">
              <div className="section-header aos" data-aos="fade-up">
                <div className="section-sub-head feature-head text-center">
                  <h2>
                    Unlimited access to 360+ courses <br />
                    and 1,600+ hands-on labs
                  </h2>
                </div>
              </div>
              <div className="icon-group aos" data-aos="fade-up">
                <div className="offset-lg-1 col-lg-12">
                  <div className="row">
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon9} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon10} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon16} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon12} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon13} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon14} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon15} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon16} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon17} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-1 col-3">
                      <div className="total-course d-flex align-items-center">
                        <div className="blur-border">
                          <div className="enroll-img ">
                            <img src={Icon18} alt="" className="img-fluid" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /Blog */}

        {/* Footer */}
        <Footer />
        {/* /Footer */}
      </div>
    </>
  );
};

export default Home;
