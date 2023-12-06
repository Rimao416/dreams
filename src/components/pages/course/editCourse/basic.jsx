import React from "react";
import { Link } from "react-router-dom";
import TextEditor from "./editor";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCourseCategories } from "../../../../redux/slice/categorySlice";
import { useStateContext } from "../../../../context/ContextProvider";
import { addCours, getCour } from "../../../../redux/slice/coursSlice";
import { useStateContext as useStateCourse } from "../../../../context/CourseProvider";
// eslint-disable-next-line react/prop-types
const Basic = ({ nextTab, input, setInput, handleChange }) => {
  const { user } = useStateContext();

  const { cours, setCours } = useStateCourse();
  console.log(cours);
  const dispatch = useDispatch();

  // const { id } = useParams();
  // console.log("L'id est "+id)

  useEffect(() => {
    dispatch(getCourseCategories()).then((result) => {
      console.log(result);
      const findCategory =
        input &&
        result?.payload.data.find((category) => category.name === input);
      console.log(findCategory);
      setCours({
        ...cours,
        categorie_id: findCategory?.id,
      });
      // const findCategorie=categoriesCourse?.find((category)=>category.id===cours.category_id)
      // setCours({
      //   ...cours,
      //   category_id: findCategorie?.id
      // })
    });
    // setCours({
    //   ...cours,
    //   user_zid: user?.id,
    // });
  }, [dispatch, user?.id, input]);

  const { categoriesCourse, loading } = useSelector(
    (state) => state?.categoryReducer
  );
  // console.log(categoriesCourse)
  const option = categoriesCourse?.map((category) => ({
    label: category.name, // Assurez-vous de remplacer 'label' par la clé réelle de vos données
    value: category.id, // Assurez-vous de remplacer 'value' par la clé réelle de vos données
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const descriptionWithoutParagraphs = cours.description.replace(
      /<\/?p>/g,
      ""
    );

    // Mettre à jour la valeur de la description dans l'objet cours
    setCours({
      ...cours,

      description: descriptionWithoutParagraphs,
    });

    // Envoyer la nouvelle valeur de la description au serveur
    dispatch(addCours(cours)).then((result) => {
      console.log(result);
    });

    // console.log(cours)

    // nextTab();
  };
  const customStyles = {
    option: (base, { isFocused }) => {
      return {
        ...base,
        backgroundColor: isFocused ? "#FFDEDA" : "white",
      };
    },
  };
  const handleOption = (e) => {
    setInput(e.label);
    (e) =>
      setCours({ ...cours, categorie_id: e.value });
  };

  return (
    <>
      <fieldset id="first">
        <div className="add-course-info">
          <div className="add-course-inner-header">
            <h4>Informations Générales</h4>
          </div>
          <div className="add-course-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="add-course-label">Titre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course Title"
                  name="title"
                  defaultValue={cours?.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className="add-course-label">Catégorie</label>

                <Select
                  options={option}
                  value={
                    option && option.find((option) => option.label === input)
                  }
                  // value={input}

                  // CHANGE CATEGORIE INTO CATEGORIE_ID
                  onChange={handleOption}
                  placeholder="Votre categorie"
                  styles={customStyles}
                ></Select>
              </div>
              <div className="form-group mb-0">
                <label className="add-course-label">Course Description</label>
                <textarea
                  name="description"
                  id=""
                  cols="30"
                  rows="10"
                  className="form-control"
                  defaultValue={cours?.description}
                  onChange={handleChange}
                ></textarea>
                <div id="editor">
                  {/* <TextEditor
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setCours({ ...cours, description: data });
                    }}
                    data={cours?.description}
                  /> */}
                </div>
              </div>
              <div className="form-group">
                <label className="add-course-label">Prix</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Course Title"
                  name="price"
                  onChange={handleChange}
                  value={cours?.price}
                />
              </div>
              <div className="form-group">
                <label className="add-course-label">
                  Ancien prix promotionnel
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Course Title"
                  name="old_price"
                  onChange={handleChange}
                  value={cours?.old_price}
                />
              </div>
            </form>
          </div>
          <div className="widget-btn">
            <Link
              to="#"
              className="btn btn-info-light next_btn"
              onClick={nextTab}
            >
              Continuer
            </Link>
          </div>
        </div>
      </fieldset>
    </>
  );
};

Basic.propTypes = {
  cours: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.String,
    old_price: PropTypes.number,
    user_id: PropTypes.number,
    categorie_id: PropTypes.number,
  }),
  setCours: PropTypes.func,
  nextTab: PropTypes.func,
  prevTab: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Basic;
