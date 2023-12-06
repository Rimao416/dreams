import React, { useEffect, useState } from "react";
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
import {
  getProfReviews,
  getProfReviewsSlug,
  getSingleProf,
} from "../../../redux/slice/profSlice";
import { profCours } from "../../../redux/slice/coursSlice";
import { toast } from "react-toastify";
export default function InstructorProfile() {
  const [prof, setProf] = useState(null);
  function contientNombre(chaine) {
    const regex = /\d/;
    return regex.test(chaine);
  }
  const { pseudo } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProf(pseudo)).then((result) => {
      console.log(result);
      if (result.type == "getSingleProf/fulfilled") {
        setProf(result.payload.data);
        dispatch(profCours(result.payload.data.id));
        dispatch(getProfReviewsSlug(pseudo)).then((result) => {
          console.log(result);
        });
      } else {
        toast.error("Erreur lors du chargement");
      }
    });
  }, []);
  const { reviews, loading } = useSelector((state) => state.profReducer);
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
          <div className="row"></div>
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
                    src={prof?.photo}
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
                    {prof?.first_name + " " + prof?.last_name}
                  </Link>
                </h4>
                <p>{prof?.role}</p>
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
                  <p>{prof?.description}</p>
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
                        <React.Fragment key={cour.id}>
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
                                        {cour.old_price
                                          ? contientNombre(cour.old_price)
                                            ? cour.old_price
                                            : ""
                                          : ""}
                                      </span>
                                    </h3>
                                  </div>
                                </div>
                                <div className="product-content">
                                  <h3 className="title instructor-text">
                                    <Link to={`/course-details/${cour.slug}`}>
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
                        </React.Fragment>
                      ))}
                  </div>
                </div>
              </div>
              {/*Courses Content  */}

              {/* Reviews */}
              <div className="card review-sec">
                <div className="card-body">
                  <h5 className="subs-title">Avis</h5>
                  {reviews &&
                    reviews?.map((review) => (
                      <>
                        <div className="review-item" key={review.id}>
                          <div className="instructor-wrap border-0 m-0">
                            <div className="about-instructor">
                              <div className="abt-instructor-img">
                                <Link to="instructor-profile">
                                  <img
                                    src={review.author_img}
                                    alt="img"
                                    className="img-fluid"
                                  />
                                </Link>
                              </div>
                              <div className="instructor-detail">
                                <h5>
                                  <Link to="instructor-profile">
                                    {review.author_first_name +
                                      " " +
                                      review.author_last_name}
                                  </Link>
                                </h5>
                              </div>
                            </div>
                            <div className="rating">
                              {[...Array(5)].map((_, index) => (
                                <i
                                  key={index}
                                  className={`fas fa-star ${
                                    index < review.note ? "filled" : ""
                                  }`}
                                ></i>
                              ))}
                            </div>
                          </div>
                          <p className="rev-info">{review.commentaire}</p>
                        </div>
                      </>
                    ))}
                </div>
              </div>
              {/* Reviews */}

              {/* Comment */}

              {/* comment */}
            </div>

            <div className="col-lg-4">
              {/* Right Sidebar Tags Label */}
              <div className="card overview-sec">
                <div className="card-body overview-sec-body">
                  <h5 className="subs-title">Catégories</h5>
                  <div className="sidebar-tag-labels">
                    <ul className="list-unstyled">
                      <li>
                        <Link to="#;" className="">
                          Piano
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* Right Sidebar Tags Label */}

              {/* Right Sidebar Profile Overview */}
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">Aperçu du profil</h5>
                  <div className="rating-grp">
                    <div className="rating">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${
                            index < prof?.notes ? "filled" : ""
                          }`}
                        ></i>
                      ))}
                      <span className="d-inline-block average-rating">
                        <span>{prof?.notes}</span>
                      </span>
                    </div>
                    <div className="course-share d-flex align-items-center justify-content-center">
                      {/* <Link to="#rate">
                        <i className="fa-regular fa-heart"></i>
                      </Link> */}
                    </div>
                  </div>
                  <div className="profile-overview-list">
                    <div className="list-grp-blk d-flex">
                      <div className="flex-shrink-0">
                        <img src={CoursesIcon} alt="Courses" />
                      </div>
                      <div className="list-content-blk flex-grow-1 ms-3">
                        <h5>{prof?.total_courses}</h5>
                        <p>Cours</p>
                      </div>
                    </div>
                    <div className="list-grp-blk d-flex">
                      <div className="flex-shrink-0">
                        <img src={TtlStudIcon} alt="Total Students" />
                      </div>
                      <div className="list-content-blk flex-grow-1 ms-3">
                        <h5>{prof?.total_etudiant}</h5>
                        <p>Total des étudiants</p>
                      </div>
                    </div>
                    {/* <div className="list-grp-blk d-flex">
                      <div className="flex-shrink-0">
                        <img src={ReviewIcon} alt="Reviews" />
                      </div>
                      <div className="list-content-blk flex-grow-1 ms-3">
                        <h5>12,230</h5>
                        <p>Avis</p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              {/* Right Sidebar Profile Overview */}

              {/* Right Contact Details */}
              <div className="card overview-sec">
                <div className="card-body">
                  <h5 className="subs-title">Coordonnées</h5>
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
                          <Link to="#;">{prof?.email}</Link>
                        </p>
                      </div>
                    </div>
                    {/* <div className="edu-wrap">
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
                    </div> */}
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
