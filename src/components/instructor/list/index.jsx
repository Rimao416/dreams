import React, { useReducer, useState } from "react";
import { InstructorHeader } from "../../instructor/header";
import Footer from "../../footer";
import { useEffect } from "react";
import { Icon1, Icon2, User11, UserIconSvg } from "../../imagepath";
import { Filter, Grid, List, Search } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProfs } from "../../../redux/slice/profSlice";
import { API } from "../../../config";

export const InstructorList = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  // dispatch(getProfs());
  // }, [dispatch]);
  // const { profs, loading } = useSelector((state) => state.profReducer);
  // console.log(profs);
  // API
  const [profs, setProf] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProfs = async () => {
    setLoading(true);
    const response = await API.get("/profs");
    console.log(response.data.data);
    setProf(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    getProfs();
  }, []);
  return (
    <div className="main-wrapper">
      <InstructorHeader activeMenu={"List"} />
      {/* BreadcrumItem */}
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
                    <li className="breadcrumb-item">Professeurs</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* BreadcrumItem */}
      {/* Page Wrapper */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              {/* Filter */}
              {/* <div className="showing-list">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="d-flex align-items-center">
                      <div className="view-icons">
                      
                        <Link
                          to="/instructor-list"
                          className="list-view active"
                        >
                          <List />
                        </Link>
                      </div>
                      <div className="show-result">
                        <h4>Showing 1-9 of 50 results</h4>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="show-filter add-course-info">
                      <form action="#">
                        <div className="row gx-2 align-items-center">
                          <div className="col-md-6 col-item">
                            <div className=" search-group">
                              <Search
                                size={16}
                                style={{
                                  position: "absolute",
                                  left: "7px",
                                  color: "#58BBDE",
                                }}
                              />
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Search our courses"
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-6 col-item">
                            <div className="form-group select-form mb-0">
                              <select
                                className="form-select select"
                                name="sellist1"
                              >
                                <option>Newly published </option>
                                <option>Angular</option>
                                <option>React</option>
                                <option>Nodejs</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* Filter */}

              <div className="row">
                {/* Instructor List */}
                {profs &&
                  profs?.map((prof, index) => (
                    <React.Fragment key={index}>
                      <div className="col-lg-12 d-flex">
                        <div className="instructor-list flex-fill">
                          <div className="instructor-img">
                            <Link to="/instructor-profile">
                              <img
                                className="img-fluid"
                                alt=""
                                src={prof.photo}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  backgroundPosition: "center",
                                }}
                              />
                            </Link>
                          </div>
                          <div className="instructor-content">
                            <h5>
                              <Link to={`/instructor-profile/${prof.pseudo}`}>
                                {prof.first_name + " " + prof.last_name}
                              </Link>
                            </h5>
                            <h6>Professeur</h6>
                            <div className="instructor-info">
                              <div className="rating-img d-flex align-items-center">
                                <img src={Icon1} className="me-1" alt="" />
                                <p>{prof.total_courses}</p>
                              </div>
                              <div className="course-view d-flex align-items-center ms-0">
                                <img src={Icon2} className="me-1" alt="" />
                                <p>9hr 30min</p>
                              </div>
                              <div className="rating-img d-flex align-items-center">
                                <img
                                  src={UserIconSvg}
                                  className="me-1"
                                  alt=""
                                />
                                <p>
                                  {prof.total_etudiant}{" "}
                                  {+" " + prof.total_etudiant > 1
                                    ? "Etudiants"
                                    : "Etudiant"}
                                </p>
                              </div>
                              <div className="rating">
                                {[...Array(5)].map((_, index) => (
                                  <i
                                    key={index}
                                    className={`fas fa-star ${
                                      index < prof.notes ? "filled" : ""
                                    }`}
                                  ></i>
                                ))}
                                <span className="d-inline-block average-rating">
                                  <span>{prof.notes}</span>
                                </span>
                              </div>
                            </div>
                            <div className="instructor-badge">
                              <span className="web-badge">Web Design</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
              </div>

              {/* Pagination */}
              <div className="row">
                <div className="col-md-12">
                  <ul className="pagination lms-page lms-pagination">
                    <li className="page-item prev">
                      <Link className="page-link" to="#;">
                        <i className="fas fa-angle-left"></i>
                      </Link>
                    </li>
                    <li className="page-item first-page active">
                      <Link className="page-link" to="#;">
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#;">
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#;">
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#;">
                        4
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link className="page-link" to="#;">
                        5
                      </Link>
                    </li>
                    <li className="page-item next">
                      <Link className="page-link" to="#;">
                        <i className="fas fa-angle-right"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Pagination */}
            </div>

            <div className="col-lg-3">
              <div className="filter-clear">
                {/* <div className="clear-filter d-flex align-items-center">
                  <h4>
                    <Filter size={18} />
                    Filters
                  </h4>
                  <div className="clear-text">
                    <p>CLEAR</p>
                  </div>
                </div> */}

          
                {/* Search Filter */}

                {/* Search Filter */}
         
                {/* Search Filter */}

                {/* Search Filter */}
                {/* <div className="card search-filter ">
                  <div className="card-body">
                    <div className="filter-widget mb-0">
                      <div className="categories-head d-flex align-items-center">
                        <h4>Price</h4>
                        <i className="fas fa-angle-down"></i>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="radio" name="select_specialist" />
                          <span className="checkmark"></span> All (18)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one">
                          <input type="radio" name="select_specialist" />
                          <span className="checkmark"></span> Free (3)
                        </label>
                      </div>
                      <div>
                        <label className="custom_check custom_one mb-0">
                          <input type="radio" name="select_specialist" />
                          <span className="checkmark"></span> Paid (15)
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
                {/* Search Filter */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Page Wrapper */}
      <Footer />
    </div>
  );
};
