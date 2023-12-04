import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../footer";
import CourseHeader from "../header";
import Basic from "./basic";
import CourseMedia from "./courseMedia";
import Curriculum from "./curriculum";
import Settings from "./settings";
import Success from "./success";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCour } from "../../../../redux/slice/coursSlice";
import { useStateContext } from "../../../../context/CourseProvider";
// import { useStateContext } from "../../../../context/ContextProvider";

const AddCourse = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(null);

  const { id } = useParams();
  console.log(id)
  // const [cours, setCours] = useState({
  //   title: null,
  //   description: "",
  //   user_id: "1",
  //   tool_id: "1",
  //   price: null,
  //   old_price: null,
  //   categorie_id: "",
  //   image: "",
  //   video: null,
  // });
  const { cours, setCours } = useStateContext();
  useEffect(() => {
    id &&
      dispatch(getCour(id)).then((result) => {
        console.log(result);
        if (result.type == "getCour/fulfilled") {
          const newPrice = parseInt(
            result.payload.data.price.replace(/\D/g, ""),
            10
          );
          const newOldPrice = parseInt(
            result.payload.data.old_price.replace(/\D/g, ""),
            10
          );
          setCours({
            ...cours,
            id: result.payload.data.id,
            title: result.payload.data.title,
            description: result.payload.data.description,
            user_id: result.payload.data.prof.id,
            tool_id: "1",
            price: newPrice,
            old_price: newOldPrice,
            // categorie_id: result.payload.data.categorie_id,
            image: result.payload.data.image,
            video: result.payload.data.video,
            

          });
          setInput(result.payload.data.categorie);
          // console.log(cours)
        }
      });
  }, [id, dispatch]);

  const [lecon, setLecon] = useState({
    title: "",
    course_id: null,
    video: "",
  });
  const handleChange = (e) => {
    console.log(cours)
    setCours({ ...cours, [e.target.name]: e.target.value });
  };
  // const {user}=useStateContext()
  // console.log(user)
  const [TabChange, setTabChange] = useState(false);
  const [TabChange1, setTabChange1] = useState(false);
  const [TabChange2, setTabChange2] = useState(false);
  const [TabChange3, setTabChange3] = useState(false);
  const [PageChange, setPageChange] = useState("basic");

  const nextTab = () => {
    setTabChange(true);
    setPageChange("courseMedia");
  };

  const prevTab1 = () => {
    setTabChange(false);
    setPageChange("basic");
  };

  const nextTab2 = () => {
    setTabChange1(true);
    setTabChange(true);
    setPageChange("curriculum");
  };

  const prevTab2 = () => {
    setTabChange1(false);
    setPageChange("courseMedia");
  };

  const nextTab3 = () => {
    setTabChange2(true);
    setTabChange(true);
    setPageChange("settings");
  };

  const prevTab3 = () => {
    setTabChange2(false);
    setPageChange("curriculum");
  };

  const nextTab4 = () => {
    setTabChange3(true);
    setTabChange(true);
    setPageChange("success");
  };

  return (
    <>
      <div className="main-wrapper">
        <CourseHeader activeMenu={"AddCourse"} />

        <section className="page-content course-sec">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-12">
                <div className="add-course-header">
                  <h2>Editer</h2>
                  <div className="add-course-btns">
                    <ul className="nav">
                      <li>
                        <Link
                          to="/dashboard-instructor"
                          className="btn btn-black"
                        >
                          Back to Course
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="btn btn-success-dark">
                          Save
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="widget-set">
                    <div className="widget-setcount">
                      <ul id="progressbar">
                        <li
                          className={
                            TabChange ? "progress-activated" : "progress-active"
                          }
                        >
                          <p>
                            <span></span> Informations Générales
                          </p>
                        </li>
                        <li
                          className={
                            TabChange1
                              ? "progress-activated"
                              : "" || TabChange
                              ? "progress-active"
                              : ""
                          }
                        >
                          <p>
                            <span></span> Cours Médias
                          </p>
                        </li>
                        <li
                          className={
                            TabChange2
                              ? "progress-activated"
                              : "" || TabChange1
                              ? "progress-active"
                              : ""
                          }
                        >
                          <p>
                            <span></span> Leçons
                          </p>
                        </li>
                        <li
                          className={
                            TabChange3
                              ? "progress-activated"
                              : "" || TabChange2
                              ? "progress-active"
                              : ""
                          }
                        >
                         
                        </li>
                      </ul>
                    </div>

                    <div className="widget-content multistep-form">
                      {PageChange === "basic" ? (
                        <Basic
                          nextTab={nextTab}
                          handleChange={handleChange}
                          input={input}
                          setInput={setInput}
                        />
                      ) : (
                        ""
                      )}
                      {PageChange === "courseMedia" ? (
                        <CourseMedia
                          nextTab2={nextTab2}
                          prevTab1={prevTab1}
                          handleChange={handleChange}
                          lecon={lecon}
                          setLecon={setLecon}
                        />
                      ) : (
                        ""
                      )}
                      {PageChange === "curriculum" ? (
                        <Curriculum
                          nextTab3={nextTab3}
                          prevTab2={prevTab2}
                          cours={cours}
                          setCours={setCours}
                          handleChange={handleChange}
                          lecon={lecon}
                          setLecon={setLecon}
                        />
                      ) : (
                        ""
                      )}
                      {PageChange === "settings" ? (
                        <Settings
                          nextTab4={nextTab4}
                          prevTab3={prevTab3}
                          cours={cours}
                          setCours={setCours}
                          handleChange={handleChange}
                        />
                      ) : (
                        ""
                      )}
                      {PageChange === "success" ? <Success /> : ""}
                    </div>
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

export default AddCourse;
