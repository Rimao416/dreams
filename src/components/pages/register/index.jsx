import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import { LoginImg, logo, NetIcon1, NetIcon2 } from "../../imagepath";
import { useState } from "react";
import { useStateContext } from "../../../context/ContextProvider";
import { API } from "../../../config";
import PropTypes from "prop-types";
import Message from "../../Message";

const hasNumber = (value) => {
  return new RegExp(/[0-9]/).test(value);
};
const hasMixed = (value) => {
  return new RegExp(/[a-z]/).test(value) && new RegExp(/[A-Z]/).test(value);
};
const hasSpecial = (value) => {
  return new RegExp(/[!#@$%^&*)(+=._-]/).test(value);
};

const strengthColor = (count) => {
  if (count < 1) return "poor";
  if (count < 2) return "weak";
  if (count < 3) return "strong";
  if (count < 4) return "heavy";
};

const Register = () => {
  const [eye, seteye] = useState(true);
  const [password, setPassword] = useState("");
  const { setToken } = useStateContext();
  const [validationError, setValidationError] = useState("");
  const [strength, setStrength] = useState("");
  const [errors, setErrors] = useState(null);
  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    pseudo: "",
    email: "",
    password: "",
  });
  const isDisabled = () => {
    return (
      !credentials.first_name ||
      !credentials.last_name ||
      !credentials.pseudo ||
      !credentials.email ||
      !credentials.password
    );
  };
  // const [pwdError, setPwdError] = useState("Use 8 or more characters with a mix of letters, numbers & symbols.")

  const onEyeClick = () => {
    seteye(!eye);
  };
  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    // setPassword(newPassword);
    setCredentials({ ...credentials, password: newPassword });
    validatePassword(newPassword);
  };

  const validatePassword = (value) => {
    if (!value) {
      setValidationError(1);
    } else if (value.length < 8) {
      setValidationError(2);
    } else if (!/[0-9]/.test(value)) {
      setValidationError(3);
    } else if (!/[!@#$%^&*()]/.test(value)) {
      setValidationError(4);
    } else {
      setValidationError(5);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    API.post("/register", credentials)
      .then(({ data }) => {
        console.log(data);
        setToken(data.access_token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          // console.log(response.data.data);
          console.log(response.data.data.pseudo[0]);
          setErrors(response.data.data);
        }
      });
  };

  const strengthIndicator = (value) => {
    let strengths = 0;

    if (value.length >= 8) strengths = 1;
    if (hasNumber(value) && value.length >= 8) strengths = 2;
    if (hasSpecial(value) && value.length >= 8 && hasNumber(value))
      strengths = 3;
    if (
      hasMixed(value) &&
      hasSpecial(value) &&
      value.length >= 8 &&
      hasNumber(value)
    )
      strengths = 3;
    return strengths;
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

  useEffect(() => {
    if (credentials.password) {
      if (credentials.password !== "") {
        let strength = strengthIndicator(credentials.password);
        let color = strengthColor(strength);
        setStrength(color);
      } else {
        setStrength("");
      }
    }
  }, [credentials.password]);

  const FormField = ({
    label,
    type,
    placeholder,
    name,
    value,
    onChange,
    error,
  }) => (
    <div className="form-group">
      <label className="form-control-label">{label}</label>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <Message message={error ? error[0] : ""} className="alert-message" />
      {/* <span style={{ fontSize: 12, color: "#DC3545", fontWeight: "500" }}>
        {error ? error[0] : ""}
      </span> */}
    </div>
  );
  FormField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  };

  return (
    <>
      <div className="main-wrapper log-wrap">
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
                    <Link to="/">Retour à l&apos;accueil</Link>
                  </div>
                </div>
                <h1>Inscription</h1>
                <form onSubmit={handleSubmit}>
                  <FormField
                    label="Email"
                    type="email"
                    placeholder="Mail"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    error={errors?.email}
                  />
                  <div className="form-group">
                    <label className="form-control-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nom"
                      name="first_name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Prenom</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Prenom"
                      name="last_name"
                      onChange={handleChange}
                    />
                  </div>
                  {/* FORMFILED FOR PSEUDO */}
                  <FormField
                    label="Pseudo"
                    type="text"
                    placeholder="Pseudo"
                    name="pseudo"
                    value={credentials.pseudo}
                    onChange={handleChange}
                    error={errors?.pseudo}
                  />

                  <div className="form-group">
                    <label className="form-control-label">Mot de passe</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        className="form-control pass-input"
                        placeholder="Mot de passe"
                        type={eye ? "password" : "text"}
                        onChange={handlePasswordChange}
                        name="password"
                      />
                      {/* <span onClick={onEyeClick} className={`fa toggle-password feather-eye" ${eye ? "fa-eye" : "fa-eye-slash" }`}/> */}
                      <span
                        onClick={onEyeClick}
                        className={`fa toggle-password feather-eye" ${
                          eye ? "fa-eye" : "fa-eye-slash"
                        }`}
                      />
                      <span className="toggle-password feather-eye"></span>
                      <span className="pass-checked">
                        <i className="feather-check"></i>
                      </span>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      disabled={isDisabled()}
                      type="submit"
                      className="btn btn-primary btn-start"
                    >
                      S&apos;inscrire
                    </button>
                  </div>
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

export default Register;
