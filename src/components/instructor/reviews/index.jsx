import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import { User1, User2, User3, User4 } from "../../imagepath";
import { InstructorHeader } from "../header";
import InstructorSidebar from "../sidebar";
import Select from "react-select";
import FeatherIcon from "feather-icons-react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProfReviews } from "../../../redux/slice/profSlice";
export default function InstructorReviews() {
  const [setReview] = useState(null);
  const [setRating] = useState(null);
  const [setSort] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleFilter = (event) => {
    setSearchQuery({
      ...searchQuery,
      [event.target.name]: event.target.value,
    });
  };
  const { reviews } = useSelector((state) => state.profReducer);

  const filteredCours = reviews?.filter((row) => {
    const noteString = String(row.note);

    const nameMatch = noteString.includes(searchQuery);
    console.log(nameMatch);
    return nameMatch;
  });
  const options = [
    { label: "Tout", value: "" },
    { label: "1 étoile", value: "1" },
    { label: "2 étoiles", value: "2" },
    { label: "3 étoiles", value: "3" },
    { label: "4 étoiles", value: "4" },
    { label: "5 étoiles", value: "5" },
    // { label: "Node", value: "Node" },
  ];
  const options2 = [
    { label: "Rating", value: "rating" },
    { label: "5", value: "5" },
    { label: "4", value: "4" },
    { label: "3", value: "3" },
  ];
  const options3 = [
    { label: "Sort", value: "sort" },
    { label: "Sort 1", value: "1" },
    { label: "Sort 2", value: "2" },
    { label: "Sort 3", value: "3" },
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
  useEffect(() => {
    dispatch(getProfReviews()).then((result) => {
      console.log(result);
    });
  }, []);
  const dispatch = useDispatch();
  return (
    <div className="main-wrapper">
      <InstructorHeader activeMenu={"Reviews"} />
      {/* Page Wrapper */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <InstructorSidebar activeMenu={"Reviews"} />
            {/* Sidebar */}

            {/* Instruction Dashboard */}
            <div className="col-xl-9 col-lg-8 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="settings-widget">
                    <div className="settings-inner-blk p-0">
                      <div className="sell-course-head comman-space">
                        <h3>Avis</h3>
                      </div>
                      <div className="comman-space pb-0">
                        <div className="instruct-search-blk mb-0">
                          <div className="show-filter all-select-blk">
                            <form action="#">
                              <div className="row gx-2 align-items-center">
                                <div className="col-md-6 col-lg-3 col-item">
                                  <div className="form-group select-form mb-1">
                                    <Select
                                      className=" select"
                                      name="sellist1"
                                      options={options}
                                      defaultValue={options[0]}
                                      placeholder="Tous"
                                      onChange={(selectedOption) =>
                                        setSearchQuery(selectedOption.value)
                                      }
                                      styles={style}
                                    ></Select>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-3 col-item">
                                  <div className="form-group select-form mb-1">
                                    <Select
                                      className=" select"
                                      name="sellist1"
                                      options={options2}
                                      defaultValue={options2[0]}
                                      placeholder="Rating"
                                      onChange={setRating}
                                      styles={style}
                                    ></Select>
                                  </div>
                                </div>
                                <div className="col-md-6 col-lg-3 col-item">
                                  <div className="form-group select-form mb-1">
                                    <Select
                                      className=" select"
                                      name="sellist1"
                                      options={options3}
                                      defaultValue={options3[0]}
                                      placeholder="Sort"
                                      onChange={setSort}
                                      styles={style}
                                    ></Select>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      {reviews &&
                        reviews?.map((review) => (
                          <React.Fragment key={review.id}>
                            <div className="comman-space bdr-bottom-line">
                              <div className="instruct-review-blk ">
                                <div className="review-item">
                                  <div className="instructor-wrap border-0 m-0">
                                    <div className="about-instructor">
                                      <div className="abt-instructor-img">
                                        <Link to="#">
                                          <img
                                            src={review.author_img}
                                            alt="img"
                                            className="img-fluid"
                                          />
                                        </Link>
                                      </div>
                                      <div className="instructor-detail">
                                        <h5>
                                          <Link to="#">
                                            {review.author_first_name +
                                              " " +
                                              review.author_last_name}
                                          </Link>
                                        </h5>
                                        <p>{review.course_title}</p>
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
                                  <p className="rev-info">
                                    {review.commentaire}
                                  </p>
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
            {/* Instructor Dashboard */}
          </div>
        </div>
      </div>
      {/* Page Wrapper */}
      <Footer />
    </div>
  );
}
