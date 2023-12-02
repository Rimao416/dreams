import React, { useEffect, useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { updateLesson } from "../../redux/slice/leconSlice";

function EditCourse({ isOpen, selectedLecon, onClose }) {
  const dispatch = useDispatch();
  // console.log(selectedLecon)
  const [lesson, setLesson] = useState({ title: "", video: "" });
  useEffect(() => {
    setLesson(selectedLecon);
  }, [selectedLecon]);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateLesson(lesson)).then((result) => {
        console.log(result)
      if (result.type == "updateLesson/prof/fulfilled") {
        onClose();
      }
    });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    console.log(files);
    files[0] && setLesson({ ...lesson, video: files[0] });
    // if (files) {
    //   setVideo(URL.createObjectURL(files[0]));
    // }
    // setCours({ ...cours, [e.target.name]: e.target.files[0] });
  };
  const handleChange = (e) => {
    setLesson({ ...lesson, [e.target.name]: e.target.value });
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
                  <span></span>
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

              <button className="btn btn-info-light next_btn" type="submit">
                Continuer
              </button>
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