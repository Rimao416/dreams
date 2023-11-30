import React, { useState } from "react";
import { InstructorHeader } from "../../instructor/header";
import Footer from "../../footer";
import {
  // Course10,
  // Course11,
  // Course12,
  // Course13,
  Course14,
  Icon1,
  TimerStart,
} from "../../imagepath";
import { Search } from "react-feather";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import InstructorSidebar from "../sidebar";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { profCours } from "../../../redux/slice/coursSlice";
// import {useSelector} from "react-redux"

export default function InstructorCourse() {
  const { cours, loading } = useSelector((state) => state.coursReducer);

  console.log(cours);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profCours());
  }, []);
  // const prof=useSelector(state=>state)
  // console.log(prof)
  const [setValue] = useState(null);
  const options = [
    { label: "Choose", value: "choose" },
    { label: "Angular", value: "Angular" },
    { label: "React", value: "React" },
    { label: "Node", value: "Node" },
  ];
  const style = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "white",
      width: "100%",
      height: "40px",
      color: "black",
      minHeight: "40px",
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
      <InstructorHeader activeMenu={"Courses"} />
      {/* Page Wrapper */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <InstructorSidebar activeMenu="Courses" />
            {/* Sidebar */}

            {/* Instructor Dashboard */}
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="settings-widget">
                    <div className="settings-inner-blk p-0">
                      <div className="sell-course-head comman-space">
                        <h3>Courses</h3>
                        <p>
                          Manage your courses and its update like live, draft
                          and insight.
                        </p>
                      </div>
                      <div className="comman-space pb-0">
                        <div className="instruct-search-blk">
                          <div className="show-filter choose-search-blk">
                            <form action="#">
                              <div className="row gx-2 align-items-center">
                                <div className="col-md-6 col-item">
                                  <div className=" search-group">
                                    <Search
                                      size={16}
                                      style={{
                                        position: "absolute",
                                        left: "7px",
                                        color: "#F66962",
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
                                    <Select
                                      className=" select"
                                      name="sellist1"
                                      options={options}
                                      defaultValue={options[0]}
                                      placeholder="Choose"
                                      onChange={setValue}
                                      styles={style}
                                    ></Select>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                        <div className="settings-tickets-blk course-instruct-blk table-responsive">
                          {/* Referred Users */}
                          <table className="table table-nowrap mb-2">
                            <thead>
                              <tr>
                                <th>COURS</th>
                                <th>ÉTUDIANTS</th>
                                <th>STATUTS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {loading == false &&
                                cours.map((cours, index) => (
                                  <>
                                  <tr>
                                    <td>
                                      <div className="sell-table-group d-flex align-items-center">
                                        <div className="sell-group-img">
                                          <Link to="/course-details">
                                            <img
                                              src={Course14}
                                              className="img-fluid "
                                              alt=""
                                            />
                                          </Link>
                                        </div>
                                        <div className="sell-tabel-info">
                                          <p>
                                            <Link to="/course-details">
                                              {cours.title}
                                            </Link>
                                          </p>
                                          <div className="course-info d-flex align-items-center border-bottom-0 pb-0">
                                            <div className="rating-img d-flex align-items-center">
                                              <img src={Icon1} alt="" />
                                              <p>{cours.total_lessons} Leçons</p>
                                            </div>
                                            <div className="course-view d-flex align-items-center">
                                              <img src={TimerStart} alt="" />
                                              <p>7hr 20min</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td>{cours.total_etudiant}</td>
                                    <td>
                                      <span className="badge info-high">
                                        Deleted
                                      </span>
                                    </td>
                                  </tr>
                                </>
                                ))}
                            </tbody>
                          </table>
                          {/* Referred Users */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Instructor Dashboard */}
          </div>
        </div>
      </div>
      {/* Page Wrapper */}
      <Footer />
    </div>
  );
}
