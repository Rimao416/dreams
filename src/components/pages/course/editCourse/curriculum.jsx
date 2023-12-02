import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addLesson, getCourLesson } from "../../../../redux/slice/leconSlice";
import { profCours } from "../../../../redux/slice/coursSlice";
import { useStateContext } from "../../../../context/ContextProvider";
import Modal from "react-modal";
import EditCourse from "../../../modal/EditCourse";
Modal.setAppElement("#root");

// eslint-disable-next-line react/prop-types
const Curriculum = ({
  nextTab3,
  prevTab2,
  cours,
  setCours,
  lecon,
  setLecon,
}) => {
  // lecon 20
  const dispatch = useDispatch();
  const [selectedLecon, setSelectedLecon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = (lecon) => {
    setSelectedLecon(lecon);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // let loading=false
  const data = useSelector((state) => state.leconReducer);
  console.log(data);
  const { user } = useStateContext();
  useEffect(() => {
    user?.id && dispatch(getCourLesson(19));
  }, [user, dispatch]);
  // console.log(lecon);
  const [video, setVideo] = useState(null);
  // const [image, setImage] = useState(null);

  // const [lecon, setLecon] = useState({
  //   title: "",
  //   course_id: null,
  //   video: "",
  // });
  const handleChange = (e) => {
    setLecon({
      ...lecon,
      [e.target.name]: e.target.value,
    });
  };
  const [loading, setLoading] = useState(false);
  const handleFileChange = (e) => {
    const { files } = e.target;
    console.log(files);
    files[0] && setLecon({ ...lecon, video: files[0] });
    if (files) {
      setVideo(URL.createObjectURL(files[0]));
    }
    // setCours({ ...cours, [e.target.name]: e.target.files[0] });
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    // loading=true
    console.log(lecon);
    // Create Form Data
    const form = new FormData();
    form.append("title", lecon.title);
    form.append("course_id", 19);
    form.append("video", lecon.video);
    dispatch(addLesson(form)).then((result) => {
      console.log(result);
      if (result.type == "addLesson/prof/fulfilled") {
        // nextTab3();

        console.log("BIEN BIEN BIEN");
        // const [loading, setLoading] = useState(false);
      }
      setLoading(false);
    });

    // setLoading(false);
    // loading=false
  };

  return (
    <>
      <fieldset className="field-card" style={{ display: "block" }}>
        <div className="add-course-info">
          <div className="add-course-inner-header">
            <h4>Leçons</h4>
          </div>
          <div className="add-course-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="form-group">
                  <label className="add-course-label">Titre de la leçon</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Course Title"
                    name="title"
                    onChange={handleChange}
                    value={lecon?.title}
                  />
                </div>
                <div className="form-group">
                  <label className="add-course-label">
                    Contenu de la video
                  </label>
                  <div className="relative-form">
                    <span>
                      {video ? video.name : " Aucun element selectionné"}
                    </span>
                    <label className="relative-file-upload">
                      Upload File{" "}
                      <input
                        type="file"
                        name="video"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group"></div>
              <div className="widget-btn">
                {/* <Link className="btn btn-black prev_btn" onClick={prevTab2}>
              Previous
            </Link> */}
                {loading == true ? (
                  <Oval
                    height={40}
                    width={40}
                    color="#58BBDE"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#A2CDDC"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                  />
                ) : (
                  <button className="btn btn-info-light next_btn" type="submit">
                    Continuer
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="curriculum-grid">
          <div className="curriculum-head">
            <p>Mes cours</p>
            {/* <Link to="#" className="btn">
              Add Lecture
            </Link> */}
          </div>

          {data?.lecons &&
            data?.lecons.map((lecon) => (
              <>
                <div className="curriculum-info">
                  <div id="accordion">
                    <div className="faq-grid">
                      <div className="faq-header">
                        <Link
                          className="collapsed faq-collapse"
                          data-bs-toggle="collapse"
                          to="#collapseOne"
                        >
                          <i className="fas fa-align-justify" /> {lecon.title}
                        </Link>
                        <div className="faq-right">
                          <Link to="#" onClick={() => openModal(lecon)}>
                            <i className="far fa-pen-to-square me-1" />
                          </Link>
                          <Link to="#" className="me-0">
                            <i className="far fa-trash-can" />
                          </Link>
                        </div>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse"
                        data-bs-parent="#accordion"
                      >
                        <div className="faq-body">
                          <div className="add-article-btns">
                            <Link to="#" className="btn">
                              Add Article
                            </Link>
                            <Link to="#" className="btn me-0">
                              Add Description
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </fieldset>
      <EditCourse isOpen={modalIsOpen} selectedLecon={selectedLecon} onClose={closeModal}/>
    </>
  );
};
Curriculum.propTypes = {
  lecon: PropTypes.shape({
    title: PropTypes.string,
    course_id: PropTypes.number,
    video: PropTypes.string,
  }),
  setLecon: PropTypes.func,
  nextTab3: PropTypes.func,
  prevTab2: PropTypes.func,
  cours: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }),
  setCours: PropTypes.func,
};

export default Curriculum;