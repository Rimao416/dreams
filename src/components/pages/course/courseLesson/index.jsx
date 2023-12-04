import React, { useEffect } from "react";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { Link, useParams } from "react-router-dom";
import Footer from "../../../footer";
import { Lock, Play, Video1 } from "../../../imagepath";
import PageHeader from "../../header";
import { useSelector, useDispatch } from "react-redux";
import { getCourLessonSlug } from "../../../../redux/slice/leconSlice";
import { getCour } from "../../../../redux/slice/coursSlice";

const CourseLesson = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    slug && dispatch(getCourLessonSlug(slug));
    slug && dispatch(getCour(slug));
  }, []);
  const { lecons } = useSelector((state) => state.leconReducer);
  const { cours } = useSelector((state) => state.coursReducer);
  console.log(cours);

  const [drop, setDrop] = useState(true);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  const [drop5, setDrop5] = useState(false);

  return (
    <>
      <div className="main-wrapper">
        <PageHeader />

        <section className="page-content course-sec course-lesson">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                {/* Introduction */}
                <div className="student-widget lesson-introduction">
                  <div className="lesson-widget-group">
                    <h4 className="tittle">{cours[0]?.title}</h4>
                    <div className="introduct-video">
                      <Link
                        to="https://www.youtube.com/embed/1trvO6dqQUI"
                        className="video-thumbnail"
                        data-fancybox=""
                      >
                        <div className="play-icon">
                          <i className="fa-solid fa-play" />
                        </div>
                        <img className="" src={Video1} alt="" />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* /Introduction */}
              </div>
              <div className="col-lg-4">
                {/* Course Lesson */}
                <div className="lesson-group">
                  <div className="course-card">
                    <h6 className="cou-title">
                      <Link
                        className="collapsed"

                        // onClick={() => setDrop(true)}
                      >
                        {cours[0]?.title}
                        <span>{cours[0]?.total_lessons} {cours[0]?.total_lessons > 1 ? "Leçons" : "Leçon"}</span>{" "}
                      </Link>
                    </h6>
                    <Collapse in={drop}>
                      <div
                        id="collapseOne"
                        className="card-collapse collapse"
                        style={{}}
                      >
                        <div className="progress-stip">
                          <div className="progress-bar bg-success progress-bar-striped active-stip" />
                        </div>
                        <div className="student-percent lesson-percent">
                          <p>
                            10hrs<span>50%</span>
                          </p>
                        </div>
                        <ul>
                          {lecons &&
                            lecons.map((lecon) => (
                              <React.Fragment key={lecon.id}>
                                <li>
                                  <p className="play-intro">{lecon.title}</p>
                                  <div>
                                    <img src={Play} alt="" />
                                  </div>
                                </li>
                              </React.Fragment>
                            ))}
                          {/* <li>
                            <p>Course Introduction </p>
                            <div>
                              <img src={Lock} alt="" />
                            </div>
                          </li> */}

                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </div>
                {/* /Course Lesson */}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default CourseLesson;
