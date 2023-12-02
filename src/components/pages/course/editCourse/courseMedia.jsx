import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { addCours } from "../../../../redux/slice/coursSlice";

// eslint-disable-next-line react/prop-types
const CourseMedia = ({ prevTab1, nextTab2, cours, setCours,lecon,setLecon }) => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  console.log(cours);

  const handleFileChange = (e) => {
    const { files } = e.target;
    console.log(files);
    files[0] && setCours({ ...cours, image: files[0] });
    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
    // setCours({ ...cours, [e.target.name]: e.target.files[0] });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(cours);
    const descriptionWithoutParagraphs = cours.description.replace(
      /<\/?p>/g,
      ""
    );

    // Mettre à jour la valeur de la description dans l'objet cours
    // setCours({
    //   ...cours,

    //   description: descriptionWithoutParagraphs,
    // });
    // nextTab2(); Ecran Suivant
    // new Form
    const form = new FormData();
    form.append("image", cours.image);
    form.append("title", cours.title);
    form.append("description", descriptionWithoutParagraphs);
    form.append("user_id", cours.user_id);
    form.append("tool_id", cours.tool_id);
    form.append("price", cours.price);
    form.append("old_price", cours.old_price);
    form.append("categorie_id", cours.categorie_id);
    // SEND DATA INTO DATABASE
    dispatch(addCours(form)).then((result) => {
      console.log(result);
      if (result.type == "addCours/prof/fulfilled") {
        setLecon({
          ...lecon,
          course_id: result.payload.data.id,
        });
        nextTab2();
      }
    });
  };

  return (
    <>
      <fieldset className="field-card" style={{ display: "block" }}>
        <div className="add-course-info">
          <div className="add-course-inner-header">
            <h4>Selectionner une image</h4>
          </div>
          <div className="add-course-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="add-course-label">Image mise en Avant</label>
                <div className="relative-form">
                  <span>No File Selected</span>
                  <label className="relative-file-upload">
                    Upload File{" "}
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="add-image-box">
                  <Link to="#">
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        style={{ width: "300px", height: "300px" }}
                      />
                    ) : (
                      <i className="far fa-image" />
                    )}
                  </Link>
                </div>
              </div>
              <div className="widget-btn">
                <Link className="btn btn-black prev_btn" onClick={prevTab1}>
                  Previous
                </Link>
                <button className="btn btn-info-light next_btn" type="submit">
                  Continue
                </button>
                <Link
                  className="btn btn-info-light next_btn"
                  onClick={nextTab2}
                >
                  Avancer
                </Link>
              </div>
            </form>
          </div>
        </div>
      </fieldset>
    </>
  );
};
CourseMedia.propTypes = {
  prevTab1: PropTypes.func,
  nextTab2: PropTypes.func,
  cours: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    old_price: PropTypes.number,
    image: PropTypes.string,
    categorie_id: PropTypes.string,
    user_id: PropTypes.number,
    tool_id: PropTypes.number,
  }),
  setCours: PropTypes.func,
};

export default CourseMedia;
