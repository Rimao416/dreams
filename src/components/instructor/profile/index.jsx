import React, { useEffect } from "react";
import { InstructorHeader } from "../../instructor/header";
import Footer from "../../footer";
import {
  AddressIcon,
  Course10,
  Course11,
  CoursesIcon,
  EmailIcon,
  Icon1,
  Icon2,
  InstructorBgBanner,
  PhoneIcon,
  ProfileAvatar,
  ReviewIcon,
  TtlStudIcon,
  User1,
  User2,
} from "../../imagepath";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSingleProf } from "../../../redux/slice/profSlice";
import { profCours } from "../../../redux/slice/coursSlice";
import { toast } from "react-toastify";
export default function InstructorProfile() {
  const { pseudo } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProf(pseudo)).then((result) => {
      console.log(result)
      if (result.type == "getSingleProf/fulfilled") {
        dispatch(profCours(result.payload.data.id)).then((result) => {
          console.log(result);
        });
      } else {
        toast.error("Erreur lors du chargement");
      }
    });
  }, []);
  const { profs, loading } = useSelector((state) => state.profReducer);
  const { cours, loading: coursloading } = useSelector(
    (state) => state.coursReducer
  );
  console.log(cours);
  return (
    <div className="main-wrapper">
      <InstructorHeader activeMenu={"Profile"} />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="breadcrumb-list">
                <nav aria-label="breadcrumb" className="page-breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Courses
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      All Courses
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      The Complete Web Developer Course 2.0
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb */}
      {/* Breadcrumb */}
      <div
        className="page-banner instructor-bg-blk"
        style={{ backgroundImage: "url(" + InstructorBgBanner + ")" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-12">
              <div className="profile-info-blk">
                <Link to="#;" className="profile-info-img">
                  <img
                    src={profs?.photo}
                    alt=""
                    className="img-fluid"
                    style={{
                      width: "90px",
                      height: "90px",
                      objectFit: "cover",
                      overflow: "hidden",
                    }}
                  />
                </Link>
                <h4>
                  <Link to="#;">
                    {profs?.first_name + " " + profs?.last_name}
                  </Link>
                </h4>
                <p>{profs?.role}</p>
                <ul className="list-unstyled inline-inline profile-info-social">
                  <li className="list-inline-item">
                    <Link to="#;">
                      <i className="fa-brands fa-facebook"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#;">
                      <i className="fa-brands fa-twitter"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#;">
                      <i className="fa-brands fa-instagram"></i>
                    </Link>
                  </li>
                  <li className="list-inline-item">
                    <Link to="#;">
                      <i className="fa-brands fa-linkedin"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb */}
      {/* Course Content */}
      <section className="page-content course-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Overview */}
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">A Propos</h5>
                  <p>{profs?.description}</p>
                </div>
              </div>
              {/* Overview */}

              {/* Courses Content */}
              <div className="card education-sec">
                <div className="card-body pb-0">
                  <h5 className="subs-title">Cours</h5>
                  <div className="row">
                    {cours &&
                      cours?.map((cour) => (
                        <>
                          <div className="col-lg-6 col-md-6 d-flex">
                            <div className="course-box course-design d-flex ">
                              <div className="product">
                                <div className="product-img">
                                  <Link to="course-details">
                                    <img
                                      // className=""
                                      alt=""
                                      src={cour.image}
                                      width="379px"
                                      height="284px"
                                    />
                                  </Link>
                                  <div className="price">
                                    <h3>
                                      {cour.price}{" "}
                                      <span>
                                        {cour.old_price ? cour.old_price : ""}
                                      </span>
                                    </h3>
                                  </div>
                                </div>
                                <div className="product-content">
                                  <h3 className="title instructor-text">
                                    <Link to="course-details">
                                      {cour.title}
                                    </Link>
                                  </h3>
                                  <div className="course-info d-flex align-items-center border-0 m-0">
                                    <div className="rating-img d-flex align-items-center">
                                      <img src={Icon1} alt="" />
                                      <p>
                                        {cour.total_lessons}{" "}
                                        {cour.total_lessons > 1
                                          ? "Leçons"
                                          : "Leçon"}
                                      </p>
                                    </div>
                                    <div className="course-view d-flex align-items-center">
                                      <img src={Icon2} alt="" />
                                      <p>9hr 30min</p>
                                    </div>
                                  </div>
                                  <div className="rating">
                                    {[...Array(5)].map((_, index) => (
                                      <i
                                        key={index}
                                        className={`fas fa-star ${
                                          index < cour.note ? "filled" : ""
                                        }`}
                                      ></i>
                                    ))}
                                    <span className="d-inline-block average-rating">
                                      <span>{cour.note}</span> (
                                      {cour.total_note})
                                    </span>
                                  </div>
                                  <div className="all-btn all-category d-flex align-items-center">
                                    <Link
                                      to="/checkout"
                                      className="btn btn-primary"
                                    >
                                      ACHETER
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                </div>
              </div>
              {/*Courses Content  */}

              {/* Reviews */}
              <div className="card review-sec">
                <div className="card-body">
                  <h5 className="subs-title">Reviews</h5>
                  <div className="review-item">
                    <div className="instructor-wrap border-0 m-0">
                      <div className="about-instructor">
                        <div className="abt-instructor-img">
                          <Link to="instructor-profile">
                            <img src={User1} alt="img" className="img-fluid" />
                          </Link>
                        </div>
                        <div className="instructor-detail">
                          <h5>
                            <Link to="instructor-profile">Nicole Brown</Link>
                          </h5>
                          <p>UX/UI Designer</p>
                        </div>
                      </div>
                      <div className="rating">
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <p className="rev-info">
                      “ This is the second Photoshop course I have completed
                      with Cristian. Worth every penny and recommend it highly.
                      To get the most out of this course, its best to to take
                      the Beginner to Advanced course first. The sound and video
                      quality is of a good standard. Thank you Cristian. “
                    </p>
                    <Link to="#;" className="btn btn-reply">
                      <i className="feather-corner-up-left"></i> Reply
                    </Link>
                  </div>
                  <div className="review-item">
                    <div className="instructor-wrap border-0 m-0">
                      <div className="about-instructor">
                        <div className="abt-instructor-img">
                          <Link to="instructor-profile">
                            <img src={User1} alt="img" className="img-fluid" />
                          </Link>
                        </div>
                        <div className="instructor-detail">
                          <h5>
                            <Link to="instructor-profile">Nicole Brown</Link>
                          </h5>
                          <p>UX/UI Designer</p>
                        </div>
                      </div>
                      <div className="rating">
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <p className="rev-info">
                      “ This is the second Photoshop course I have completed
                      with Cristian. Worth every penny and recommend it highly.
                      To get the most out of this course, its best to to take
                      the Beginner to Advanced course first. The sound and video
                      quality is of a good standard. Thank you Cristian. “
                    </p>
                    <Link to="#;" className="btn btn-reply">
                      <i className="feather-corner-up-left"></i> Reply
                    </Link>
                  </div>
                  <div className="review-item">
                    <div className="instructor-wrap border-0 m-0">
                      <div className="about-instructor">
                        <div className="abt-instructor-img">
                          <Link to="instructor-profile">
                            <img src={User1} alt="img" className="img-fluid" />
                          </Link>
                        </div>
                        <div className="instructor-detail">
                          <h5>
                            <Link to="instructor-profile">Nicole Brown</Link>
                          </h5>
                          <p>UX/UI Designer</p>
                        </div>
                      </div>
                      <div className="rating">
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star filled"></i>
                        <i className="fas fa-star"></i>
                      </div>
                    </div>
                    <p className="rev-info">
                      “ This is the second Photoshop course I have completed
                      with Cristian. Worth every penny and recommend it highly.
                      To get the most out of this course, its best to to take
                      the Beginner to Advanced course first. The sound and video
                      quality is of a good standard. Thank you Cristian. “
                    </p>
                    <Link to="#;" className="btn btn-reply">
                      <i className="feather-corner-up-left"></i> Reply
                    </Link>
                  </div>
                </div>
              </div>
              {/* Reviews */}

              {/* Comment */}
              <div className="card comment-sec">
                <div className="card-body">
                  <h5 className="subs-title">Add a review</h5>
                  <form>
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
                        rows="4"
                        className="form-control"
                        placeholder="Your Comments"
                      ></textarea>
                    </div>
                    <div className="submit-section">
                      <button className="btn submit-btn" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              {/* comment */}
            </div>

            <div className="col-lg-4">
              {/* Right Sidebar Tags Label */}
              <div className="card overview-sec">
                <div className="card-body overview-sec-body">
                  <h5 className="subs-title">Professional Skills</h5>
                  <div className="sidebar-tag-labels">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="#;" className="">
                          User Interface Design
                        </Link>
                      </li>
                      <li>
                        <Link to="#;">Web Development</Link>
                      </li>
                      <li>
                        <Link to="#;">Web Design</Link>
                      </li>
                      <li>
                        <Link to="#;">UI Design</Link>
                      </li>
                      <li>
                        <Link to="#;">Mobile App Design</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right Sidebar Tags Label */}

              {/* Right Sidebar Profile Overview */}
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">Profile Overview</h5>
                  <div className="rating-grp">
                    <div className="rating">
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star filled"></i>
                      <i className="fas fa-star"></i>
                      <span className="d-inline-block average-rating">
                        <span>4.0</span> (15)
                      </span>
                    </div>
                    <div className="course-share d-flex align-items-center justify-content-center">
                      <Link to="#rate">
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="profile-overview-list">
                    <div className="list-grp-blk d-flex">
                      <div className="flex-shrink-0">
                        <img src={CoursesIcon} alt="Courses" />
                      </div>
                      <div className="list-content-blk flex-grow-1 ms-3">
                        <h5>32</h5>
                        <p>Courses</p>
                      </div>
                    </div>
                    <div className="list-grp-blk d-flex">
                      <div className="flex-shrink-0">
                        <img src={TtlStudIcon} alt="Total Students" />
                      </div>
                      <div className="list-content-blk flex-grow-1 ms-3">
                        <h5>11,604</h5>
                        <p>Total Students</p>
                      </div>
                    </div>
                    <div className="list-grp-blk d-flex">
                      <div className="flex-shrink-0">
                        <img src={ReviewIcon} alt="Reviews" />
                      </div>
                      <div className="list-content-blk flex-grow-1 ms-3">
                        <h5>12,230</h5>
                        <p>Reviews</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Sidebar Profile Overview */}

              {/* Right Contact Details */}
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">Contact Details</h5>
                  <div className="contact-info-list">
                    <div className="edu-wrap">
                      <div className="edu-name">
                        <span>
                          <img src={EmailIcon} alt="Address" />
                        </span>
                      </div>
                      <div className="edu-detail">
                        <h6>Email</h6>
                        <p>
                          <Link to="#;">jennywilson@example.com</Link>
                        </p>
                      </div>
                    </div>
                    <div className="edu-wrap">
                      <div className="edu-name">
                        <span>
                          <img src={AddressIcon} alt="Address" />
                        </span>
                      </div>
                      <div className="edu-detail">
                        <h6>Address</h6>
                        <p>877 Ferry Street, Huntsville, Alabama</p>
                      </div>
                    </div>
                    <div className="edu-wrap">
                      <div className="edu-name">
                        <span>
                          <img src={PhoneIcon} alt="Address" />
                        </span>
                      </div>
                      <div className="edu-detail">
                        <h6>Phone</h6>
                        <p>
                          {" "}
                          <Link to="#;">+1(452) 125-6789</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Contact Details */}
            </div>
          </div>
        </div>
      </section>
      {/* Course Content */}
      <Footer />
    </div>
  );
}
