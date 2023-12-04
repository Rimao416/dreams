// import Collapse from 'react-bootstrap/Collapse';
import React from "react";
import { useState } from "react";
import {
  Chapter,
  Chart,
  Cloud,
  Icon1,
  Icon2,
  Import,
  Key,
  Mobile,
  People,
  Play,
  Teacher,
  Timer2,
  User1,
  Users,
  Video,
  Video2,
} from "../../../imagepath";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FeatherIcon from "feather-icons-react";

const DetailsContent = ({ cours }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3] = useState(false);
  const [open4] = useState(false);

  return (
    <>
      <section className="page-content course-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Overview */}
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">Aperçu</h5>
                  <h6>Description</h6>
                  <p>{cours?.description}</p>
                </div>
              </div>
              {/* /Overview */}
              {/* Course Content */}
              <div className="card content-sec">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6">
                      <h5 className="subs-title">Contenu du cours</h5>
                    </div>
                    <div className="col-sm-6 text-sm-end">
                      <h6>92 Lectures 10:56:11</h6>
                    </div>
                  </div>
                  {cours.lessons?.map((lesson) => (
                    <React.Fragment key={lesson.id}>
                      <div className="course-card">
                        <h6 className="cou-title">
                          <Link
                            className="collapsed"
                            data-bs-toggle="collapse"
                            to="#collapseOne"
                            aria-expanded={open}
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                          >
                            {lesson.title}
                          </Link>
                        </h6>

                        <div
                          id="collapseOne"
                          className="card-collapse collapse"
                        >
                          <ul>
                            <li>
                              <p>
                                <img src={Play} alt="" className="me-2" />
                                Lecture1.1 Introduction to the User
                                ExperienceCourse
                              </p>
                              <div>
                                <Link to="#">Preview</Link>
                                <span>02:53</span>
                              </div>
                            </li>
                            <li>
                              <p>
                                <img src={Play} alt="" className="me-2" />
                                Lecture1.2 Exercise: Your first design challenge
                              </p>
                              <div>
                                <Link to="#">Preview</Link>
                                <span>02:53</span>
                              </div>
                            </li>
                            <li>
                              <p>
                                <img src={Play} alt="" className="me-2" />
                                Lecture1.3 How to solve the previous exercise
                              </p>
                              <div>
                                <Link to="#">Preview</Link>
                                <span>02:53</span>
                              </div>
                            </li>
                            <li>
                              <p>
                                <img src={Play} alt="" className="me-2" />
                                Lecture1.3 How to solve the previous exercise
                              </p>
                              <div>
                                <Link to="#">Preview</Link>
                                <span>02:53</span>
                              </div>
                            </li>
                            <li>
                              <p>
                                <img src={Play} alt="" className="me-2" />
                                Lecture1.5 How to use text layers effectively
                              </p>
                              <div>
                                <Link to="#">Preview</Link>
                                <span>02:53</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
              {/* /Course Content */}
              {/* Instructor */}
              <div className="card instructor-sec">
                <div className="card-body">
                  <h5 className="subs-title">About the instructor</h5>
                  <div className="instructor-wrap">
                    <div className="about-instructor">
                      <div className="abt-instructor-img">
                        <Link to="/instructor-profile">
                          <img src={User1} alt="img" className="img-fluid" />
                        </Link>
                      </div>
                      <div className="instructor-detail">
                        <h5>
                          <Link to="/instructor-profile">Nicole Brown</Link>
                        </h5>
                        <p>UX/UI Designer</p>
                      </div>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star me-1" />
                      <span className="d-inline-block average-rating">
                        4.5 Instructor Rating
                      </span>
                    </div>
                  </div>
                  <div className="course-info d-flex align-items-center">
                    <div className="cou-info">
                      <img src={Play} alt="" />
                      <p>5 Courses</p>
                    </div>
                    <div className="cou-info">
                      <img src={Icon1} alt="" />
                      <p>12+ Lesson</p>
                    </div>
                    <div className="cou-info">
                      <img src={Icon2} alt="" />
                      <p>9hr 30min</p>
                    </div>
                    <div className="cou-info">
                      <img src={People} alt="" />
                      <p>270,866 students enrolled</p>
                    </div>
                  </div>
                  <p>
                    UI/UX Designer, with 7+ Years Experience. Guarantee of High
                    Quality Work.
                  </p>
                  <p>
                    Skills: Web Design, UI Design, UX/UI Design, Mobile Design,
                    User Interface Design, Sketch, Photoshop, GUI, Html, Css,
                    Grid Systems, Typography, Minimal, Template, English,
                    Bootstrap, Responsive Web Design, Pixel Perfect, Graphic
                    Design, Corporate, Creative, Flat, Luxury and much more.
                  </p>
                  <p>Available for:</p>
                  <ul>
                    <li>1. Full Time Office Work</li>
                    <li>2. Remote Work</li>
                    <li>3. Freelance</li>
                    <li>4. Contract</li>
                    <li>5. Worldwide</li>
                  </ul>
                </div>
              </div>
              {/* /Instructor */}
              {/* Reviews */}
              <div className="card review-sec">
                <div className="card-body">
                  <h5 className="subs-title">Reviews</h5>
                  <div className="instructor-wrap">
                    <div className="about-instructor">
                      <div className="abt-instructor-img">
                        <Link to="instructor-profile">
                          <img src={User1} alt="img" className="img-fluid" />
                        </Link>
                      </div>
                      <div className="instructor-detail">
                        <h5>
                          <Link to="/instructor-profile">Nicole Brown</Link>
                        </h5>
                        <p>UX/UI Designer</p>
                      </div>
                    </div>
                    <div className="rating">
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star filled me-1" />
                      <i className="fas fa-star me-1" />
                      <span className="d-inline-block average-rating">
                        4.5 Instructor Rating
                      </span>
                    </div>
                  </div>
                  <p className="rev-info">
                    “ This is the second Photoshop course I have completed with
                    Cristian. Worth every penny and recommend it highly. To get
                    the most out of this course, its best to to take the
                    Beginner to Advanced course first. The sound and video
                    quality is of a good standard. Thank you Cristian. “
                  </p>
                  <Link to="#" className=" btn-reply">
                    {/* <i className="feather-corner-up-left" /> */}
                    <FeatherIcon icon="corner-up-left" />
                    Reply
                  </Link>
                </div>
              </div>
              {/* /Reviews */}
              {/* Comment */}
              <div className="card comment-sec">
                <div className="card-body">
                  <h5 className="subs-title">Post A comment</h5>
                  <form action="#">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        rows={4}
                        className="form-control"
                        placeholder="Your Comments"
                        defaultValue={""}
                      />
                    </div>
                    <div className="submit-section">
                      <button className=" submit-btn" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* /Comment */}
            </div>
            <div className="col-lg-4">
              <div className="sidebar-sec">
                {/* Video */}
                <div className="video-sec vid-bg">
                  <div className="card">
                    <div className="card-body">
                      <Link
                        to="https://www.youtube.com/embed/1trvO6dqQUI"
                        className="video-thumbnail"
                        data-fancybox=""
                      >
                        <div className="play-icon">
                          <i className="fa-solid fa-play" />
                        </div>
                        <img className="" src={Video} alt="" />
                      </Link>
                      <div className="video-details">
                        <div className="course-fee">
                          <h2>FREE</h2>
                          <p>
                            <span>$99.00</span> 50% off
                          </p>
                        </div>
                        <div className="row gx-2">
                          <div className="col-md-6 addHeart">
                            <Link
                              to="/course-wishlist"
                              className=" btn btn-wish w-100"
                            >
                              {/* <i className="feather-heart" />  */}
                              <FeatherIcon icon="heart" />
                              Add to Wishlist
                            </Link>
                          </div>
                          <div className="col-md-6 addHeart">
                            <Link to="#" className="btn btn-wish w-100">
                              {/* <i className="feather-share-2" />  */}
                              <FeatherIcon icon="share-2" />
                              Share
                            </Link>
                          </div>
                        </div>
                        <Link to="/checkout" className="btn btn-enroll w-100">
                          Enroll Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Video */}
                {/* Include */}
                <div className="card include-sec">
                  <div className="card-body">
                    <div className="cat-title">
                      <h4>Includes</h4>
                    </div>
                    <ul>
                      <li>
                        <img src={Import} className="me-2" alt="" /> 11 hours
                        on-demand video
                      </li>
                      <li>
                        <img src={Play} className="me-2" alt="" /> 69
                        downloadable resources
                      </li>
                      <li>
                        <img src={Key} className="me-2" alt="" /> Full lifetime
                        access
                      </li>
                      <li>
                        <img src={Mobile} className="me-2" alt="" /> Access on
                        mobile and TV
                      </li>
                      <li>
                        <img src={Cloud} className="me-2" alt="" /> Assignments
                      </li>
                      <li>
                        <img src={Teacher} className="me-2" alt="" />{" "}
                        Certificate of Completion
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /Include */}
                {/* Features */}
                <div className="card feature-sec">
                  <div className="card-body">
                    <div className="cat-title">
                      <h4>Includes</h4>
                    </div>
                    <ul>
                      <li>
                        <img src={Users} className="me-2" alt="" /> Enrolled:{" "}
                        <span>32 students</span>
                      </li>
                      <li>
                        <img src={Timer2} className="me-2" alt="" /> Duration:{" "}
                        <span>20 hours</span>
                      </li>
                      <li>
                        <img src={Chapter} className="me-2" alt="" /> Chapters:{" "}
                        <span>15</span>
                      </li>
                      <li>
                        <img src={Video2} className="me-2" alt="" /> Video:
                        <span> 12 hours</span>
                      </li>
                      <li>
                        <img src={Chart} className="me-2" alt="" /> Level:{" "}
                        <span>Beginner</span>
                      </li>
                    </ul>
                  </div>
                </div>
                {/* /Features */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

DetailsContent.propTypes = {
  cours: PropTypes.object.isRequired, // Remplacez `object` par le type attendu pour `cours`
};

export default DetailsContent;
