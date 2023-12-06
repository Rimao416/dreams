import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Icon1, Icon2 } from "../../../imagepath";
import PropTypes from "prop-types";
import { API } from "../../../../config";
import { useNavigate } from "react-router-dom";
import Button from "../../../Button";
const InnerPage = ({ cours }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const payCourse = async (id) => {
    setLoading(true);
    console.log(id);
    try {
      const response = await API.post(`/payCourse`, { course_id: id });
      toast.info("Envoie");
      console.log(response);
      toast.success(response.data.message);
      window.location.href = response.data.lien;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (!error.response) {
        throw error;
      }
    }
    setLoading(false);
  };
  return (
    <>
      <div className="row">
        {cours &&
          cours?.map((cour) => (
            <>
              <div className="col-lg-12 col-md-12 d-flex" key={cour.id}>
                <div className="course-box course-design list-course d-flex">
                  <div className="product">
                    <div className="product-img">
                      <Link to={`/course-details/${cour.slug}`}>
                        <img
                          className="img-fluid"
                          alt=""
                          src={cour.image}
                          style={{
                            width: "240px",
                            height: "179px",
                            backgroundPosition: "center",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                      <div className="price">
                        <h3>
                          {cour.price} <span>{cour.old_price}</span>
                        </h3>
                      </div>
                    </div>
                    <div className="product-content">
                      <div className="head-course-title">
                        <h3 className="title">
                          <Link to={`/course-details/${cour.slug}`}>
                            {cour.title}
                          </Link>
                        </h3>
                        <div className="all-btn all-category d-flex align-items-center">
                          <Button loading={loading}>
                            <Link
                              to="#"
                              onClick={() => payCourse(cour.id)}
                              className="btn btn-primary"
                            >
                              ACHETER
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="course-info border-bottom-0 pb-0 d-flex align-items-center">
                        <div className="rating-img d-flex align-items-center">
                          <img src={Icon1} alt="" />
                          <p>
                            {cour.total_lessons}{" "}
                            {cour.total_lessons > 1 ? "Leçons" : "Leçon"}
                          </p>
                        </div>
                        <div className="course-view d-flex align-items-center">
                          <img src={Icon2} alt="" />
                          <p>{cour.duration}</p>
                        </div>
                      </div>
                      <div className="rating">
                        {[...Array(5)].map((_, index) => (
                          <i
                            key={index}
                            className={`fas fa-star ${
                              index < cour.note ? "filled" : ""
                            }`}
                          ></i>
                        ))}

                        <span className="d-inline-block average-rating">
                          <span>{cour.note}</span> ({cour.total_note})
                        </span>
                      </div>
                      <div className="course-group d-flex mb-0">
                        <div className="course-group-img d-flex">
                          <Link to="/instructor-profile">
                            <img
                              src={cour.prof.photo}
                              alt=""
                              className="img-fluid"
                              width={"40px"}
                              height={"40px"}
                            />
                          </Link>
                          <div className="course-name">
                            <h4>
                              <Link to="/instructor-profile">
                                {cour.prof.first_name} {cour.prof.last_name}
                              </Link>
                            </h4>
                            <p>{cour.prof.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};
InnerPage.propTypes = {
  cours: PropTypes.array.isRequired, // ou le type approprié pour votre cas
  // ... autres propriétés
};

export default InnerPage;
