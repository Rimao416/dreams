import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import { LoginImg, logo, NetIcon1, NetIcon2 } from "../../imagepath";
import FeatherIcon from "feather-icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slice/authSlice";
import { API } from "../../../config";
import { useStateContext } from "../../../context/ContextProvider";
import Message from "../../Message";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();
  const isDisabled = () => {
    return !credentials.email || !credentials.password;
  };

  const [passwordType, setPasswordType] = useState("password");
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    API.post("/login", credentials)
      .then(({ data }) => {
        console.log(data);
        // setUser(data.user)
        setToken(data.access_token);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.message);
          setErrors(response.data.message);
        }
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  var settings = {
    //autoWidth: true,
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
                    Bienvenue<br />
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
                <div className="w-100">
                  <div className="img-logo">
                    <img src={logo} className="img-fluid" alt="Logo" />
                    <div className="back-home">
                      <Link to="/">Back to Home</Link>
                    </div>
                  </div>
                  <h1>Sign into Your Account</h1>
                  {errors && <Message message={errors} />}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-control-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email address"
                        onChange={handleChange}
                        name="email"
                        value={credentials.email}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-control-label">Password</label>
                      <div className="pass-group">
                        <input
                          type={passwordType}
                          onChange={handleChange}
                          value={credentials.password}
                          name="password"
                          className="form-control"
                          placeholder="Password"
                        />
                        <span
                          className="toggle-password feather-eye"
                          onClick={togglePassword}
                        >
                          {passwordType === "password" ? (
                            <FeatherIcon icon="eye" />
                          ) : (
                            <FeatherIcon icon="eye-off" />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="forgot">
                      <span>
                        <Link className="forgot-link" to="/forgot-password">
                          Forgot Password ?
                        </Link>
                      </span>
                    </div>
                    <div className="remember-me">
                      <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                        {" "}
                        Remember me
                        <input type="checkbox" name="radio" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="d-grid">
                      <button
                        disabled={isDisabled()}
                        className="btn btn-start"
                        type="submit"
                      >
                        Connexion
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="google-bg text-center">
                <span>
                  <Link to="#">Or sign in with</Link>
                </span>
                <div className="sign-google">
                  <ul>
                    <li>
                      <Link to="#">
                        <img src={NetIcon1} className="img-fluid" alt="Logo" />{" "}
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
                  New User ? <Link to="/register">Create an Account</Link>
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

export default Login;
