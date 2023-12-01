import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Empty, logo } from "../../../imagepath";

const Error404 = () => {
  useEffect(() => {
    document.body.classList.add("error-page");
    return () => document.body.classList.remove("error-page");
  }, []);

  return (
    <>
      <div className="main-wrapper">
        <div className="error-box">
          <div className="error-logo">
            <Link to="/">
              <img src="logo.svg" className="img-fluid" alt="Logo" />
            </Link>
          </div>
          <div className="error-box-img">
            <img src={Empty} alt="" className="img-fluid" />
          </div>
          <h3 className="h2 mb-3"> Page introuvable</h3>
         
          <Link to="/" className="btn btn-primary">
           Retourner à l&apos;accueil
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error404;
