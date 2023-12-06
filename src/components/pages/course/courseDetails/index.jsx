import React from "react";
import CourseHeader from "../header";
import InnerBanner from "../../../../assets/img/inner-banner.jpg";
import DetailsContent from "./detailsContent";
import { Icon1, People, Timer, User1 } from "../../../imagepath";
import Footer from "../../../footer";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCour } from "../../../../redux/slice/coursSlice";
import { InstructorHeader } from "../../../instructor/header";
const CourseDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  // const [co]

  useEffect(() => {
    // getCour(slug).then((result) => {
    //   console.log(result);
    // });
    dispatch(getCour(slug)).then((result) => {
      console.log(result);
    });
  }, [slug]);
  const { cours, loading } = useSelector((state) => state.coursReducer);
  console.log(cours);
  return (
    <>
      <div className="main-wrapper">
        {/* <CourseHeader activeMenu={"CourseDetails"} /> */}
        <InstructorHeader />
        <div className="breadcrumb-bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-12">
                <div className="breadcrumb-list">
                  <nav aria-label="breadcrumb" className="page-breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/">Accueil</Link>
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Cours
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        Tous les cours
                      </li>
                      <li className="breadcrumb-item" aria-current="page">
                        {cours[0]?.title}
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="inner-banner"
          style={{ backgroundImage: "url(" + cours[0]?.image + ")" }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="instructor-wrap border-bottom-0 m-0">
                  <div className="about-instructor align-items-center">
                    <div className="abt-instructor-img">
                      <Link to="/instructor-profile">
                        <img
                          src={cours[0]?.prof.photo}
                          alt="img"
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                    <div className="instructor-detail me-3">
                      <h5>
                        <Link to="/instructor-profile">
                          {cours[0]?.prof.first_name +
                            " " +
                            cours[0]?.prof.last_name}
                        </Link>
                      </h5>
                      <p>{cours[0]?.prof.role}</p>
                    </div>
                    <div className="rating mb-0">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`fas fa-star ${
                            index < cours[0]?.note ? "filled" : ""
                          }`}
                        ></i>
                      ))}
                      <span className="d-inline-block average-rating">
                        <span>{cours[0]?.total_note}</span> (15)
                      </span>
                    </div>
                  </div>
                  <span className="web-badge mb-3">
                    {cours[0]?.categorie.toUpperCase()}
                  </span>
                </div>
                <h2>{cours[0]?.title}</h2>
                <p>{cours[0]?.description}</p>
                <div className="course-info d-flex align-items-center border-bottom-0 m-0 p-0">
                  <div className="cou-info">
                    <img src={Icon1} alt="" />
                    <p>
                      {cours[0]?.total_lessons}{" "}
                      {cours[0]?.lesson > 1 ? "Leçons" : "Leçon"}
                    </p>
                  </div>
                  <div className="cou-info">
                    <img src={Timer} alt="" />
                    <p>{cours[0]?.duration}</p>
                  </div>
                  <div className="cou-info">
                    <img src={People} alt="" />
                    <p>
                      {cours[0]?.total_etudiant}{" "}
                      {cours[0]?.total_etudiant > 1 ? "Etudiants" : "Etudiant"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {cours[0] && <DetailsContent cours={cours[0]} />}

        <Footer />
      </div>
    </>
  );
};

export default CourseDetails;
