import React from "react";
import CourseHeader from "../header";
import InnerPage from "./innerPage";
import Footer from "../../../footer";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCours } from "../../../../redux/slice/coursSlice";
import { InstructorHeader } from "../../../instructor/header";

const CourseList = () => {
  const [search, setSearchQuery] = useState({
    cours: "",
  });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    page &&
      dispatch(getCours(page)).then((result) => {
        console.log(result);
      });
  }, [page]);
  const { cours, meta } = useSelector((state) => state.coursReducer);
  const loadPaggination = (page) => {
    setPage(page);
    setCurrentPage(page);
  };
  const customStyles = {
    option: (base, { isFocused }) => {
      return {
        ...base,
        backgroundColor: isFocused ? "#FFDEDA" : "white",
      };
    },
    // dropdownIndicator: (base, state) => ({
    //   ...base,
    //   transform: state.selectProps.menuIsOpen ? 'rotate(-180deg)' : 'rotate(0)',
    //   transition: '300ms',
    // }),
  };

  const [input, setInput] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      <div className="main-wrapper">
        {/* <CourseHeader activeMenu={"CourseList"} /> */}
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Tous les cours
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="course-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                {/* Filter */}
                <div className="showing-list">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="d-flex align-items-center">
                        <div className="col-lg-12">
                          <div className="show-filter add-course-info ">
                            {/* <form action="#">
                              <div className="row gx-2 align-items-center">
                                <div className="col-md-6 col-item">
                                  <div className=" search-group">
                                    <i className="feather-search me-2">
                                      <FeatherIcon icon="search" />
                                    </i>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Taper un cours"
                                    />
                                  </div>
                                </div>
                              </div>
                            </form> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Filter */}

                <InnerPage cours={cours} />

                {/* /pagination */}
                <div className="row">
                  <div className="col-md-12">
                    <ul className="pagination lms-page">
                      <li className="page-item prev">
                        <Link className="page-link" to="#">
                          <i className="fas fa-angle-left" />
                        </Link>
                      </li>
                      {Array.from({ length: meta?.last_page }, (_, index) => (
                        <li
                          key={index + 1}
                          className={`page-item ${
                            index + 1 === currentPage ? "active" : ""
                          }`}
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={() => loadPaggination(index + 1)}
                          >
                            {index + 1}
                          </Link>
                        </li>
                      ))}
                      {/* <li className="page-item first-page active">
                        <Link className="page-link" to="#">
                          1
                        </Link>
                      </li> */}
                      {/* <li className="page-item">
                        <Link className="page-link" to="#">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          4
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="#">
                          5
                        </Link>
                      </li>
                      <li className="page-item next">
                        <Link className="page-link" to="#">
                          <i className="fas fa-angle-right" />
                        </Link>
                      </li> */}
                    </ul>
                  </div>
                </div>
                {/* /pagination */}
              </div>

              <div className="col-lg-3 theiaStickySidebar">
                <div className="stickysidebar">
                  <div className="filter-clear">
                    {/* Search Filter */}
                    {/* <div className="card search-filter categories-filter-blk">
                      <div className="card-body">
                        <div className="filter-widget mb-0">
                          <div className="categories-head d-flex align-items-center">
                            <h4>Course categories</h4>
                            <i className="fas fa-angle-down" />
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> Backend (3)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> CSS (2)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> Frontend (2)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input
                                type="checkbox"
                                name="select_specialist"
                                defaultChecked="true"
                              />
                              <span className="checkmark" /> General (2)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input
                                type="checkbox"
                                name="select_specialist"
                                defaultChecked="true"
                              />
                              <span className="checkmark" /> IT &amp; Software
                              (2)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> Photography (2)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> Programming
                              Language (3)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check mb-0">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> Technology (2)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* /Search Filter */}
                    {/* Search Filter */}
                    {/* <div className="card search-filter">
                      <div className="card-body">
                        <div className="filter-widget mb-0">
                          <div className="categories-head d-flex align-items-center">
                            <h4>Instructors</h4>
                            <i className="fas fa-angle-down" />
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> Keny White (10)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> Hinata Hyuga (5)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check">
                              <input type="checkbox" name="select_specialist" />
                              <span className="checkmark" /> John Doe (3)
                            </label>
                          </div>
                          <div>
                            <label className="custom_check mb-0">
                              <input
                                type="checkbox"
                                name="select_specialist"
                                defaultChecked="true"
                              />
                              <span className="checkmark" /> Nicole Brown
                            </label>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* /Search Filter */}
                    {/* Search Filter */}

                    {/* /Search Filter */}
                    {/* Latest Posts */}

                    {/* /Latest Posts */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default CourseList;
