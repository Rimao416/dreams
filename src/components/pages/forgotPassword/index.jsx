import React, { useState } from "react";
import { LoginImg, logo } from "../../imagepath";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../../config";
import Button from "../../Button";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const  navigate  = useNavigate();
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(email);
    try {
      const response = await API.post(`/forgotPassword`, { email });
      console.log(response);
      navigate("/reset-password", { state: { email: email } });
      toast.success(response.data.message);
      // navigate("/reset-password");
    } catch (error) {
      if (error.response.data.message.startsWith("SQLSTATE[23000]")) {
        toast.success("Nous vous avons envoyé un code de réinitialisation!");
        navigate("/reset-password", { state: { email: email } });
      } else {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
    setLoading(false);
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
                    <Link to="/">Retour à l&apos;accueil</Link>
                  </div>
                </div>
                <h1>Mot de passe oublié ?</h1>
                <div className="reset-password">
                  <p>
                    Saisissez votre email pour réinitialiser
                    votre mot de passe.
                  </p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-control-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      required
                      onChange={handleChange}
                      value={email}
                    />
                  </div>
                  <Button loading={loading}>
                    <div className="d-grid">
                      <button className="btn btn-start" type="submit">
                        Envoyer
                      </button>
                    </div>
                  </Button>
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

export default ForgotPassword;
