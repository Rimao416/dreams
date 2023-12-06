import React, { useState } from "react";
import StudentHeader from "../../student/header";
import Footer from "../../footer";
import StudentSideBar from "../sidebar";
import { API } from "../../../config";
import { toast } from "react-toastify";
import Button from "../../Button";
import { InstructorHeader } from "../../instructor/header";
export default function StudentSecurity() {
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (password.new_password !== password.new_password_confirmation) {
      toast.error("Les mots de passe ne sont pas identiques");
      setLoading(false);
      return;
    }
    try {
      const response = await API.post("/changePassword", password);
      console.log(response);
      toast.success(response.data.message);
      setPassword({
        old_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // Object.values(error.response.data.errors).forEach((errorArray) => {
      //   console.log(errorArray);
      //   toast.error(errorArray[0]);
      // });
      console.log(error);
    }
  };
  const isDisabled = () => {
    if (
      password.old_password &&
      password.new_password &&
      password.new_password_confirmation
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <div className="main-wrapper">
      {/* <StudentHeader activeMenu={"Security"} /> */}
      <InstructorHeader />
      {/* Student Dashboard */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <StudentSideBar activeMenu={"Security"} />
            {/* Sidebar */}

            {/* Student Security */}
            <div className="col-xl-9 col-md-8">
              <div className="settings-widget profile-details">
                <div className="settings-menu p-0">
                  <div className="profile-heading">
                    <h3>Securité</h3>
                    <p>
                      Modifiez les paramètres de votre compte et changez votre
                      mot de passe ici
                    </p>
                  </div>

                  <div className="checkout-form personal-address">
                    <div className="personal-info-head">
                      <h4>Modifier le mot de passe</h4>
                    </div>
                    <div className="row">
                      <div className="col-lg-6">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label className="form-control-label">
                              Mot de passe actuel
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={handleChange}
                              value={password.old_password}
                              name="old_password"
                            />
                          </div>
                          <div className="form-group">
                            <label className="form-control-label">
                              Nouveau mot de passe
                            </label>
                            <div className="pass-group" id="passwordInput">
                              <input
                                type="password"
                                className="form-control pass-input"
                                placeholder="Entrer un mot de passe fort"
                                name="new_password"
                                onChange={handleChange}
                                value={password.new_password}
                              />
                            </div>
                            <div
                              className="password-strength"
                              id="passwordStrength"
                            >
                              <span id="poor"></span>
                              <span id="weak"></span>
                              <span id="strong"></span>
                              <span id="heavy"></span>
                            </div>
                            <div id="passwordInfo"></div>
                          </div>
                          <div className="form-group">
                            <label className="form-control-label">
                              Re-tapez le mot de passe
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              onChange={handleChange}
                              value={password.new_password_confirmation}
                              name="new_password_confirmation"
                            />
                          </div>
                          <div className="update-profile save-password">
                            <Button loading={loading}>
                              <button
                                disabled={isDisabled()}
                                type="submit"
                                className="btn btn-primary"
                              >
                                Mettre à jour
                              </button>
                            </Button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Student Security */}
          </div>
        </div>
      </div>
      {/* Student Dashboard */}
      <Footer />
    </div>
  );
}
