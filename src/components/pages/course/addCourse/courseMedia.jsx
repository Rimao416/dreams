import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const CourseMedia = ({prevTab1,nextTab2,cours,setCours}) => {

  const [image, setImage] = useState(null);
  const handleFileChange = (e) => {
    const {files}=e.target 
    console.log(files)
    files[0] && setCours({ ...cours, image: files[0] });
    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
    // setCours({ ...cours, [e.target.name]: e.target.files[0] });
  }
  return (

    <>
      <fieldset className="field-card" style={{display:"block"}}>
        <div className="add-course-info">
          <div className="add-course-inner-header">
            <h4>Courses Media</h4>
          </div>
          <div className="add-course-form">
            <form action="#">
              <div className="form-group">
                <label className="add-course-label">Course cover image</label>
                <div className="relative-form">
                  <span>No File Selected</span>
                  <label className="relative-file-upload">
                    Upload File <input type="file" onChange={handleFileChange}/>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <div className="add-image-box">
                  <Link to="#">
                    {image ? <img src={image} alt="" style={{width:"300px",height:"300px"}}/> : <i className="far fa-image" />}
                    
                  </Link>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Video URL"
                />
              </div>
              <div className="form-group">
                <div className="add-image-box add-video-box">
                  <Link to="#">
                    <i className="fas fa-circle-play"/>
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <div className="widget-btn">
            <Link className="btn btn-black prev_btn" onClick={prevTab1}>Previous</Link>
            <Link className="btn btn-info-light next_btn" onClick={nextTab2}>Continue</Link>
          </div>
        </div>
      </fieldset>
    </>
  );
};
CourseMedia.propTypes={
  prevTab1:PropTypes.func,
  nextTab2:PropTypes.func,
  cours:PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    old_price: PropTypes.number,
  }),
  setCours:PropTypes.func
}

export default CourseMedia;
