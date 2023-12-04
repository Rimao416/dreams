import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  addLesson,
  deleteLesson,
  getCourLesson,
} from "../../../../redux/slice/leconSlice";
import { toast } from "react-toastify";
import { profCours, updateCours } from "../../../../redux/slice/coursSlice";
import { useStateContext } from "../../../../context/ContextProvider";
import Modal from "react-modal";
import EditCourse from "../../../modal/EditCourse";
import SeeCourse from "../../../modal/SeeCourse";
import Button from "../../../Button";
Modal.setAppElement("#root");
import {useNavigate} from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Curriculum = ({
  nextTab3,
  prevTab2,
  cours,
  setCours,
  lecon,
  setLecon,
}) => {
  const navigate=useNavigate()
  // lecon 20
  const dispatch = useDispatch();
  const [selectedLecon, setSelectedLecon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [seeOpen, setSetOpen] = useState(false);
  const openModal = (lecon) => {
    setSelectedLecon(lecon);
    setModalIsOpen(true);
  };
  const seeModal = (lecon) => {
    setSelectedLecon(lecon);
    setSetOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  // let loading=false
  const data = useSelector((state) => state.leconReducer);
  console.log(data);
  const { user } = useStateContext();
  useEffect(() => {
    console.log(cours?.course_id);
    user?.id && dispatch(getCourLesson(lecon?.course_id));
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
    form.append("course_id", lecon?.course_id);
    form.append("video", lecon.video);
    dispatch(addLesson(form)).then((result) => {
      console.log(result);
      if (result.type == "addlessons/fulfilled") {
        // nextTab3();

        toast.success("Lecon ajouté avec succès");
        // const [loading, setLoading] = useState(false);
      } else {
        // console.log(result)
        // toast.error("Cours non ajouter");
        // for (const key in result.payload.data) {
        //   if (errorObject.hasOwnProperty(key)) {
        //     const errorMessage = errorObject[key][0];
        //     console.log(errorMessage);
        //     // Vous pouvez utiliser la valeur de errorMessage comme vous le souhaitez
        //   }
        // }
        // const errorMessages = Object.values(result.payload.data).map(
        //   (errorArray) => errorArray[0]
        // );

        // console.log(errorMessages);
        Object.values(result?.payload.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
      }
      setLoading(false);
    });

    // setLoading(false);
    // loading=false
  };
  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette leçon ? Cette action sera irréversible!"
    );
    if (shouldDelete) {
      // // Effectuer l'action de suppression ici
      dispatch(deleteLesson(id)).then((result) => {
        if (result.type == "deleteLesson/fulfilled") {
          toast.success("Leçon supprimé avec succès");
        }
        console.log(result);
      });
    } else {
      // L'utilisateur a cliqué sur "Annuler", aucune action nécessaire
      toast.error("Error lors de la suppression");
      console.log("Suppression annulée");
    }
  };

  const updateCour = () => {
    // console.log(cours);
    const update_cours = { status: 1, id: lecon.course_id };
    console.log(lecon.course_id);

    console.log(update_cours);
    dispatch(updateCours(update_cours)).then((result) => {
      if (result.type == "updateCours/fulfilled") {
        toast.success("Cours Publié à jour avec succès");
        navigate("/prof-cours")
      } else {
        Object.values(result?.payload.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });
      }
      console.log(result);
    });
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
                      {video ? "Vidéo Chargée" : " Aucun element selectionné"}
                    </span>
                    <label className="relative-file-upload">
                      Charger un fichier{" "}
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
                <Link className="btn btn-black prev_btn" onClick={prevTab2}>
                  Précédent
                </Link>
                <Button loading={loading}>
                  <button className="btn btn-info-light next_btn" type="submit">
                    Ajouter une leçon
                  </button>
                </Button>

                {data.lecons.length > 0 && (
                  // <Link
                  //   className="btn btn-info-light next_btn"
                  //   onClick={prevTab2}
                  // >
                  <Link
                    className="btn btn-info-light next_btn"
                    onClick={updateCour}
                  >
                    Continuer
                  </Link>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="curriculum-grid">
          <div className="curriculum-head">
            <p>Leçons</p>
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
                          <i
                            className="fas fa-align-justify"
                            onClick={() => openModal(lecon)}
                          />{" "}
                          {lecon.title}
                        </Link>
                        <div className="faq-right">
                          <Link to="#" onClick={() => openModal(lecon)}>
                            <i className="far fa-pen-to-square me-1" />
                          </Link>
                          <Link to="#" onClick={() => seeModal(lecon)}>
                            <i className="far fa-eye me-1" />
                          </Link>
                          <Link
                            to="#"
                            className="me-0"
                            onClick={() => handleDelete(lecon.id)}
                          >
                            <i className="far fa-trash-can" />
                          </Link>
                        </div>
                      </div>
                      {/* <div
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
                      </div> */}
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </fieldset>
      <EditCourse
        isOpen={modalIsOpen}
        selectedLecon={selectedLecon}
        onClose={closeModal}
      />
      <SeeCourse
        isOpen={seeOpen}
        selectedLecon={selectedLecon}
        onClose={() => setSetOpen(false)}
      />
    </>
  );
};
Curriculum.propTypes = {
  lecon: PropTypes.shape({
    title: PropTypes.string,
    course_id: PropTypes.number,
    video: PropTypes.string,
    id: PropTypes.number,
  }),
  setLecon: PropTypes.func,
  nextTab3: PropTypes.func,
  prevTab2: PropTypes.func,
  cours: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    old_price: PropTypes.number,
    course_id: PropTypes.number,
  }),
  setCours: PropTypes.func,
};

export default Curriculum;
