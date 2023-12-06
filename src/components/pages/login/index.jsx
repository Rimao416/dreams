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
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
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
        const me = API.get("/me");
        me.then(({ data }) => {
          console.log(data);
          setUser(data.data);
          if (data.data.role == "etudiant") {
            navigate("/setting-edit-profile");
          } else if (data.data.role == "professeur") {
            navigate("/profile");
          }
        });
        // dispatch(login());
        // toast.success(data.message);
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
    items: 1,
    margin: 25,
    dots: false,
    nav: false,
    navText: [
      '<i className="fas fa-arrow-left"></i>',
      '<i className="fas fa-arrow-right"></i>',
    ],

    loop: false,
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
                <div className="w-100">
                  <div className="img-logo">
                    <img
                      src={"https://themusichall.fr/assets/logo.svg"}
                      width={"50%"}
                      className="img-fluid"
                      alt="Logo"
                    />
                    <div className="back-home">
                      <Link to="/">Retourner à l&apos;accueil</Link>
                    </div>
                  </div>
                  <h1>Connexion</h1>
                  {errors && <Message message={errors} />}
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-control-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={handleChange}
                        name="email"
                        value={credentials.email}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-control-label">Mot de passe</label>
                      <div className="pass-group">
                        <input
                          type={passwordType}
                          onChange={handleChange}
                          value={credentials.password}
                          name="password"
                          className="form-control"
                          placeholder="Mot de passe"
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
                          Mot de passe oublié ?
                        </Link>
                      </span>
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
            </div>
            {/* /Login */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
