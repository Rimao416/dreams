import React, { useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import { LoginImg, logo } from "../../imagepath";
import { useState } from "react";
import { Link } from "react-router-dom";
// import Button from "../../Button";
import { toast } from "react-toastify";
import ButtonLoader from "../../ButtonLoader";
import { API } from "../../../config";
import { useLocation, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  useEffect(() => {
    if (!data || !data.email) {
      toast.error("Veuillez renseigner votre email");
      navigate("/forgot-password");
    }
    // console.log(data);
  }, [data?.email]);
  const [eye, seteye] = useState(true);
  const [eye2, seteye2] = useState(true);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
    code: "",
    email: "",
  });
  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log("envoyé");
    setLoading(true);
    e.preventDefault();

    try {
      const response = await API.post(`/updatePassword`, {
        ...password,
        email: data.email,
      });
      console.log(response);
      if (response.status == 200) {
        toast.success("Mot de passe reinitialisé!");
        navigate("/login");
      } else {
        ("");
      }
      // console.log(response)
      // toast.success(response.data.message);
      // console.log(response.data);
      // navigate("/login");

      // Object.keys(errorData).forEach((fieldName) => {
      //   const errorMessages = errorData[fieldName];
      //   errorMessages.forEach((errorMessage) => {
      //     console.error(`${fieldName}: ${errorMessage}`);
      //   });
      // });
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.data) {
        Object.keys(error.response.data.data).forEach((fieldName) => {
          const errorMessages = error.response.data.data[fieldName];
          errorMessages.forEach((errorMessage) => {
            toast.error(`${errorMessage}`);
          });
        });
      } else {
        toast.error(error.response.data.message);
        navigate("/forgot-password");
      }
      // toast.error(error.response.response);
      // console.log(error/)
    }
    setLoading(false);
    setLoading(false);
  };

  const onEyeClick = () => {
    seteye(!eye);
  };

  const onEyeClick2 = () => {
    seteye2(!eye2);
  };

  var settings = {
    items: 2,
    margin: 25,
    dots: false,
    nav: false,
    navText: [
      '<i className="fas fa-arrow-left"></i>',
      '<i className="fas fa-arrow-right"></i>',
    ],

    loop: true,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 1,
      },
      1170: {
        items: 1,
      },
    },
  };
  return (
    <>
      <div className="main-wrapper">
        <div className="row">
          {/* Login Banner */}
          <div className="col-md-6 login-bg">
            <OwlCarousel
              {...settings}
              className="owl-carousel login-slide owl-theme"
            >
              <div className="welcome-login">
                <div className="login-banner">
                  <img src={LoginImg} className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Bienvenue sur <br />
                    The Music Hall
                  </h2>
                  <p></p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src={LoginImg} className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Bienvenue sur <br />
                    The Music Hall
                  </h2>
                  <p></p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src={LoginImg} className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Bienvenue sur <br />
                    The Music Hall
                  </h2>
                  <p></p>
                </div>
              </div>
            </OwlCarousel>
          </div>
          {/* /Login Banner */}
          <div className="col-md-6 login-wrap-bg">
            {/* Login */}
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="img-logo">
                   <img src={"https://themusichall.fr/assets/logo.svg"} width={"50%"}  className="img-fluid" alt="Logo" />
                  <div className="back-home">
                    <Link to="#">Retour à l&apos;accueil</Link>
                  </div>
                </div>
                <h1>Configuration d&apos;un nouveau mot de passe</h1>
                <form onSubmit={handleSubmit}>
                  {/* <div className="form-group">
                    <label className="form-control-label">Email</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        className="form-control pass-input"
                        // placeholder="Entrer votre code"
                        type={"text"}
                        name="code"
                        value={email}
                        disabled
                      />
                    </div>
                  </div> */}
                  <div className="form-group">
                    <label className="form-control-label">Code</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        className="form-control pass-input"
                        placeholder="Entrer votre code"
                        type={"text"}
                        name="code"
                        value={password.code}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Mot de passe</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        className="form-control pass-input"
                        placeholder="Entrer votre mot de passe"
                        type={eye ? "password" : "text"}
                        name="password"
                        value={password.password}
                        onChange={handleChange}
                      />
                      <span
                        onClick={onEyeClick}
                        className={`fa toggle-password feather-eye" ${
                          eye ? "fa-eye" : "fa-eye-slash"
                        }`}
                      />
                      <span className="pass-checked">
                        <i className="feather-check" />
                      </span>
                    </div>
                    {/* <div className="password-strength" id="passwordStrength">
                      <span id="poor" />
                      <span id="weak" />
                      <span id="strong" />
                      <span id="heavy" />
                    </div> */}
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">
                      Confirmez votre mot de passe
                    </label>
                    <div className="pass-group" id="passwordInputs">
                      <input
                        className="form-control pass-input"
                        placeholder="Confirmer votre mot de passe"
                        type={eye2 ? "password" : "text"}
                        name="confirmPassword"
                        value={password.confirmPassword}
                        onChange={handleChange}
                      />
                      <span
                        onClick={onEyeClick2}
                        className={`fa toggle-password feather-eye" ${
                          eye2 ? "fa-eye" : "fa-eye-slash"
                        }`}
                      />
                      <span className="pass-checked">
                        <i className="feather-check" />
                      </span>
                    </div>
                  </div>

                  <div className="d-grid">
                    <ButtonLoader loading={loading}>Envoyer</ButtonLoader>
                    {/* <Button loading={loading}>
                      <button className="btn btn-start" type="submit">
                        Envoyer
                      </button>
                    </Button> */}
                  </div>
                  {/* <div className="reset-account">
                    <p className="mb-0">
                      Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                  </div> */}
                </form>
              </div>
            </div>
            {/* /Login */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPassword;
