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
      !credentials.password ||
      validationError != 5
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

  const messages = () => {
    if (validationError == 1) {
      return "";
    } else if (validationError == 2) {
      return (
        <span
          id="poor"
          className="active"
          style={{ fontSize: 12, color: "#DC3545" }}
        >
          😠 Weak. Must contain at least 8 characters
        </span>
      );
    } else if (validationError == 3) {
      return (
        <span
          id="weak"
          className="active"
          style={{ fontSize: 12, color: "#FFC107" }}
        >
          😲 Average. Must contain at least 1 letter or number
        </span>
      );
    } else if (validationError == 4) {
      return (
        <span
          id="strong"
          className="active"
          style={{ fontSize: 12, color: "#0D6EFD" }}
        >
          🙂 Almost. Must contain special symbol
        </span>
      );
    } else if (validationError == 5) {
      return (
        <span
          id="heavy"
          className="active"
          style={{ fontSize: 12, color: "#4BB543" }}
        >
          😊 Awesome! You have a secure password.
        </span>
      );
    }
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
    dots: true,
    nav: true,
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
                    Welcome to <br />
                    DreamsLMS Courses.
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src={LoginImg} className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Welcome to <br />
                    DreamsLMS Courses.
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                </div>
              </div>
              <div className="welcome-login">
                <div className="login-banner">
                  <img src={LoginImg} className="img-fluid" alt="Logo" />
                </div>
                <div className="mentor-course text-center">
                  <h2>
                    Welcome to <br />
                    DreamsLMS Courses.
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
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
                  <img src={logo} className="img-fluid" alt="Logo" />
                  <div className="back-home">
                    <Link to="/">Back to Home</Link>
                  </div>
                </div>
                <h1>Sign up</h1>
                <form onSubmit={handleSubmit}>
                  <FormField
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    error={errors?.email}
                  />
                  <div className="form-group">
                    <label className="form-control-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your first name"
                      name="first_name"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your last name"
                      name="last_name"
                      onChange={handleChange}
                    />
                  </div>
                  {/* FORMFILED FOR PSEUDO */}
                  <FormField
                    label="Pseudo"
                    type="text"
                    placeholder="Enter your pseudo"
                    name="pseudo"
                    value={credentials.pseudo}
                    onChange={handleChange}
                    error={errors?.pseudo}
                  />

                  <div className="form-group">
                    <label className="form-control-label">Password</label>
                    <div className="pass-group" id="passwordInput">
                      <input
                        className="form-control pass-input"
                        placeholder="Enter your password"
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
                    <div
                      id="passwordStrength"
                      style={{ display: "flex" }}
                      className={`password-strength ${
                        strength === "poor"
                          ? "poor-active"
                          : strength === "weak"
                          ? "avg-active"
                          : strength === "strong"
                          ? "strong-active"
                          : strength === "heavy"
                          ? "heavy-active"
                          : ""
                      }`}
                    >
                      <span id="poor" className="active"></span>
                      <span id="weak" className="active"></span>
                      <span id="strong" className="active"></span>
                      <span id="heavy" className="active"></span>
                    </div>
                    <div id="passwordInfo">{messages()}</div>
                  </div>

                  <div className="form-check remember-me">
                    <label className="form-check-label mb-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="remember"
                      />
                      I agree to the&nbsp;
                      <Link to="/term-condition">Terms of Service</Link>{" "}
                      and&nbsp;
                      <Link to="/privacy-policy">Privacy Policy.</Link>
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      disabled={isDisabled()}
                      type="submit"
                      className="btn btn-primary btn-start"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
              <div className="google-bg text-center">
                <span>
                  <Link to="#">Or sign in with</Link>
                </span>
                <div className="sign-google">
                  <ul>
                    <li>
                      <Link to="#">
                        <img src={NetIcon1} className="img-fluid" alt="Logo" />
                        Sign In using Google
                      </Link>
                    </li>
                    <li>
                      <Link to="#">
                        <img src={NetIcon2} className="img-fluid" alt="Logo" />
                        Sign In using Facebook
                      </Link>
                    </li>
                  </ul>
                </div>
                <p className="mb-0">
                  Already have an account? <Link to="/login">Sign in</Link>
                </p>
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
