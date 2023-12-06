import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { Link, useParams } from "react-router-dom";

import Footer from "../../../footer";
import Videojs from "video.js";
import "video.js/dist/video-js.css";
import { Lock, Play, Video1 } from "../../../imagepath";
import PageHeader from "../../header";
import { useSelector, useDispatch } from "react-redux";
import { getCourLessonSlug } from "../../../../redux/slice/leconSlice";
import {
  course_progression,
  getCour,
} from "../../../../redux/slice/coursSlice";
import { API } from "../../../../config";

const CourseLesson = () => {
  // const [progression, setProgression] = useState(0);
  const { slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    slug && dispatch(getCourLessonSlug(slug));
    slug && dispatch(getCour(slug));
    slug && dispatch(course_progression(slug));
    // .then(() => {
    //   API.get(`/course-progression/${slug}`).then((res) => {
    //     // setProgression(res.data.data.progression);
    //   });
    // });
  }, []);
  const videoRef = useRef(null);
  const { lecons } = useSelector((state) => state.leconReducer);
  const { progression } = useSelector((state) => state.coursReducer);
  console.log(progression);

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  useEffect(() => {
    if (!videoRef.current) {
      // L'élément vidéo n'est pas encore disponible, ne rien faire
      return;
    }

    if (videoRef.current && lecons[currentLessonIndex]) {
      setTimeout(() => {
        const player = Videojs(videoRef.current, {
          controls: true,
          autoplay: false,
          fluid: true,
          sources: [
            {
              src: lecons[currentLessonIndex].video,
              type: "video/mp4",
            },
            // Ajoutez d'autres sources si dés disponibles (par exemple, pour plusieurs formats)
          ],
        });
        player.src(lecons[currentLessonIndex].video);
        return () => {
          if (player) {
            player.dispose();
          }
        };
      }, 3000);
      // const player = Videojs(videoRef.current, {
      //   controls: true,
      //   autoplay: false,
      //   fluid: true,
      //   sources: [
      //     {
      //       src: lecons[2].video,
      //       type: "video/mp4",
      //     },
      //     // Ajoutez d'autres sources si nécessaire (par exemple, pour différents formats)
      //   ],
      // });
      // player.src(lecons[2].video);

      // Nettoyez le lecteur vidéo lorsque le composant est démonté
    }
  }, [lecons, currentLessonIndex]);

  const switchToLesson = (index) => {
    setCurrentLessonIndex(index);

    // API.post(`/watchLesson`, sendId).then((res) => {
    //   console.log(res);
    // });
  };
 
  const sendClick = (lecon) => {
    console.log(lecon)
    const sendId = { lesson_id: lecon };
    console.log(sendId);
    API.post(`/watchLesson`, sendId).then((res) => {
      console.log(res)
      dispatch(course_progression(slug));
    });
  };

  const { cours } = useSelector((state) => state.coursReducer);
  // console.log(cours);

  const [drop, setDrop] = useState(true);

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
                    {lecons && (
                      <div data-vjs-player>
                        <video ref={videoRef} className="video-js" />
                      </div>
                    )}
                    {/* <div className="introduct-video">
                    <Videojs {...videoJsOptions} />
                    </div> */}
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
                        <span>
                          {cours[0]?.total_lessons}{" "}
                          {cours[0]?.total_lessons > 1 ? "Leçons" : "Leçon"}
                        </span>{" "}
                      </Link>
                    </h6>
                    <Collapse in={drop}>
                      <div
                        id="collapseOne"
                        className="card-collapse collapse"
                        style={{}}
                      >
                        <div className="progress-stip">
                          <div
                            className="progress-bar bg-success progress-bar-striped active-stip"
                            style={{ width: `${progression}` }}
                          />
                        </div>
                        <div className="student-percent lesson-percent">
                          <p>
                            {cours[0]?.duration}
                            <span>{progression}</span>
                          </p>
                        </div>
                        <ul>
                          {lecons &&
                            lecons.map((lecon, index) => (
                              <React.Fragment key={lecon.id}>
                                <li>
                                  <Link
                                    onClick={() => {
                                      switchToLesson(index);
                                      sendClick(lecon.id);
                                    }}
                                    className="play-intro cursor-pointer"
                                  >
                                    {lecon.title}
                                  </Link>
                                  <Link
                                    to="#"
                                    className="play-intro cursor-pointer"
                                  >
                                    {lecon.duration}
                                  </Link>
                                  {/* <div>
                                    {lecon.duration}
                                  </div> */}
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
