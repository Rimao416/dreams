import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import {
  Course10,
  Course11,
  Course12,
  Course13,
  Course14,
  Course15,
  Course16,
  Course17,
  User11,
} from "../../imagepath";
import StudentHeader from "../header";
import CourseMenu from "../courseMenu";
import { Search } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { getPaidCourses } from "../../../redux/slice/studentSlice";

export default function CourseStudent() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPaidCourses()).then((result) => {
      console.log(result);
    });
  }, []);
  const { user } = useStateContext();
  const [setValue] = useState(null);
  const { cours } = useSelector((state) => state.studentReducer);
  console.log(cours);
  const options = [
    { label: "Newly Published", value: "new" },
    { label: "Angular", value: "1" },
    { label: "React", value: "2" },
    { label: "Node", value: "3" },
  ];
  const style = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "white",
      width: "100%",
      height: "40px",
      color: "black",
      minHeight: "40px",
      border: "1px solid #e9ecef",
      paddingLeft: "5px",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: state.isSelected ? "0" : "10px",
      fontSize: "14px",
      "&:hover": {
        cursor: "pointer",
      },
      outline: "none",
    }),
    menu: (base) => ({ ...base, marginTop: "0px" }),
    menuList: (base) => ({ ...base, padding: "0" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FFDEDA" : "white",
      color: "black",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#FFDEDA",
        // #dddddd
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
  return (
    <div className="main-wrapper">
      <StudentHeader />
      <div className="course-student-header">
        <div className="container">
          <div className="student-group">
            <div className="course-group ">
              <div className="course-group-img d-flex">
                <Link to="/students-profile">
                  <img
                    src={user?.photo}
                    alt=""
                    className="img-fluid"
                    width={"300px"}
                    height={"300px"}
                  />
                  {/* <img src={User11} alt="" className="img-fluid" /> */}
                </Link>
                <div className="d-flex align-items-center">
                  <div className="course-name">
                    <h4>
                      <Link to="/students-profile">
                        {user?.first_name + " " + user?.last_name}
                      </Link>
                    </h4>
                    <p>{user?.role}</p>
                  </div>
                </div>
              </div>
              <div className="course-share ">
                <Link to="/setting-edit-profile" className="btn btn-primary">
                  Paramètres du compte
                </Link>
              </div>
            </div>
          </div>
          <CourseMenu activeMenu={"Courses"} />
        </div>
      </div>

      <section className="course-content">
        <div className="container">
          <div className="student-widget">
            <div className="student-widget-group">
              <div className="row">
                <div className="col-lg-12">
                  <div className="showing-list">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="show-filter choose-search-blk">
                          <form action="#">
                            <div className="mycourse-student align-items-center">
                              <div className="student-search">
                                <div className=" search-group">
                                  <Search className="searchFeather" size={16} />
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Rechercher un cours"
                                  />
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    {cours &&
                      cours?.map((cour) => (
                        <React.Fragment key={cour.id}>
                          <div className="col-xl-3 col-lg-4 col-md-6 d-flex">
                            <div className="course-box course-design d-flex ">
                              <div className="product">
                                <div className="product-img">
                                  <Link to={`/course-details/${cour.slug}`}>
                                    <img
                                      className="img-fluid"
                                      alt=""
                                      src={cour.image}
                                      width={"271px"}
                                      height={"203px"}
                                      // 271 X 203
                                    />
                                  </Link>
                                </div>
                                <div className="product-content">
                                  <h3 className="title">
                                    <Link to={`/course-details/${cour.slug}`}>
                                      {cour.title}
                                    </Link>
                                  </h3>
                                  <div className="rating-student">
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
                                        <span>{cour.note}</span>
                                      </span>
                                    </div>
                                    {/* <div className="edit-rate">
                                      <Link to="#;">Edit rating</Link>
                                    </div> */}
                                  </div>
                                  <div className="progress-stip">
                                    <div className="progress-bar bg-success progress-bar-striped active-stip"></div>
                                  </div>
                                  <div className="student-percent">
                                    <p>35% Completed</p>
                                  </div>
                                  <div className="start-leason hoverBlue d-flex align-items-center">
                                    <Link
                                      to={`/course-lesson/${cour.slug}`}
                                      className={
                                        cours?.user_start
                                          ? "btn btn-primary"
                                          : "btn btn-dark"
                                      }
                                    >
                                      {cours?.user_start
                                        ? "Démarrer le cours"
                                        : "Continuer le cours"}
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
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
