import React, { useEffect, useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { updateLesson } from "../../redux/slice/leconSlice";
import { useStateContext } from "../../context/CourseProvider";
import { toast } from "react-toastify";
import Button from "../Button";
function EditCourse({ isOpen, selectedLecon, onClose }) {
  const dispatch = useDispatch();
  const { cours } = useStateContext();
  const [video, setVideo] = useState(null);
  // console.log(selectedLecon)
  const [lesson, setLesson] = useState(null);
  console.log(video)

  const handleFileChange = (e) => {
    const { files } = e.target;
    console.log(files);
    if (files && files[0] instanceof Blob) {
      setLesson({ ...lesson, video: files[0] });

      const videoUrl = URL.createObjectURL(files[0]);
      setVideo(videoUrl);
    }
    // setCours({ ...cours, [e.target.name]: e.target.files[0] });
  };
  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setLesson(selectedLecon);
    setVideo(null)
  }, [selectedLecon]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log("moi");
    console.log(lesson);
    // new form
    const form = new FormData();
    // form.append("video", lesson.video);
    if (video) {
      form.append("video", lesson.video);
    }
    form.append("title", lesson.title);
    form.append("id", lesson.id);
    dispatch(updateLesson(form)).then((result) => {
      if (result.type === "updateLesson/fulfilled") {
        toast.success("Lecon modifié avec succès");
        onClose();
        setLoading(false);
      } else {
        Object.values(result?.payload.data).forEach((errorArray) => {
          console.log(errorArray);
          toast.error(errorArray[0]);
        });
      }
      setLoading(false);
      // if (result.type == "updateLesson/prof/fulfilled") {
      //   onClose();
      // }
    });
    // add more form fields if needed
    // } else {
    //   console.log("lui");
    //   const leconClone = { id: lesson?.id, title: lesson?.title };
    //   console.log(leconClone);
    //   dispatch(updateLesson(leconClone)).then((result) => {
    //     console.log(result);
    //     if (result.type === "updateLesson/fulfilled") {
    //       toast.success("Lecon modifié avec succès");
    //       onClose();
    //     } else {
    //       Object.values(result?.payload.data).forEach((errorArray) => {
    //         console.log(errorArray);
    //         toast.error(errorArray[0]);
    //       });
    //     }
    //     setLoading(false);
    //   });
    // }
    // event.preventDefault();
    // dispatch(updateLesson(lesson)).then((result) => {
    //     console.log(result)
    //   if (result.type == "updateLesson/prof/fulfilled") {
    //     onClose();
    //   }
    // });
  };

  return (
    <ModalLayout isOpen={isOpen}>
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
                  value={lesson?.title}
                />
              </div>
              <div className="form-group">
                <label className="add-course-label">Contenu de la video</label>
                <div className="relative-form">
                  <span>
                    {video ? "Vidéo Chargée" : " Aucun element selectionné"}
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
              <Button loading={loading}>
                <button className="btn btn-info-light next_btn" type="submit">
                  Continuer
                </button>
              </Button>

              <button className="btn btn-black prev_btn" onClick={onClose}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </ModalLayout>
  );
}
EditCourse.propTypes = {
  isOpen: PropTypes.bool,
  selectedLecon: PropTypes.object, // Ajustez le type en fonction de la structure de votre objet leçon
  onClose: PropTypes.func.isRequired,
};

export default EditCourse;
