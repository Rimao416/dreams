import React from "react";
import { Link } from "react-router-dom";
import TextEditor from "./editor";
import PropTypes from "prop-types";
import Select from "react-select";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCourseCategories } from "../../../../redux/slice/categorySlice";
import { useStateContext } from "../../../../context/ContextProvider";
import { addCours } from "../../../../redux/slice/coursSlice";
// eslint-disable-next-line react/prop-types
const Basic = ({ nextTab, cours, setCours, handleChange }) => {
  // toast.success("BONJOUR")
  const { user } = useStateContext();
  const [input, setInput] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourseCategories());
    // setCours({
    //   ...cours,
    //   user_id: user?.id,
    // });
  }, [dispatch, user?.id]);

  const { categoriesCourse, loading } = useSelector(
    (state) => state?.categoryReducer
  );
  // console.log(categoriesCourse)
  const option = categoriesCourse?.map((category) => ({
    label: category.name, // Assurez-vous de remplacer 'label' par la clé réelle de vos données
    value: category.id, // Assurez-vous de remplacer 'value' par la clé réelle de vos données
  }));
  const isDisabled = () => {
    return cours?.title || cours?.description || cours?.price
  };
  // console.log(cours?.old_price)

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
                  onChange={handleChange}
                  value={cours?.title}
                />
              </div>
              <div className="form-group">
                <label className="add-course-label">Catégorie</label>
                <Select
                  options={option}
                  defaultValue={input}
                  // CHANGE CATEGORIE INTO CATEGORIE_ID
                  onChange={(selectedOption) =>
                    setCours({ ...cours, categorie_id: selectedOption.value })
                  }
                  placeholder="Votre categorie"
                  styles={customStyles}
                ></Select>
              </div>
              <div className="form-group mb-0">
                <label className="add-course-label">Course Description</label>
                <div id="editor">
                  <TextEditor
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setCours({ ...cours, description: data });
                    }}
                    data={cours?.description}
                  />
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
            <button
            // disabled={!isDisabled()}
              // type="submit"
              className="btn btn-info-light next_btn"
              onClick={nextTab}
            >
              Continue
            </button>
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
    price: PropTypes.number,
    old_price: PropTypes.number,
    category_id: PropTypes.number,
    user_id: PropTypes.number,


  }),
  setCours: PropTypes.func,
  nextTab: PropTypes.func,
  prevTab: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Basic;
