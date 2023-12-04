import React from "react";
import StudentHeader from "../../student/header";
import Footer from "../../footer";
import StudentSideBar from "../sidebar";

export default function StudentSecurity() {
  return (
    <div className="main-wrapper">
      <StudentHeader activeMenu={"Security"} />
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
                        <form action="#">
                          <div className="form-group">
                            <label className="form-control-label">
                            Mot de passe actuel
                            </label>
                            <input type="password" className="form-control" />
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
                            <input type="password" className="form-control" />
                          </div>
                          <div className="update-profile save-password">
                            <button type="button" className="btn btn-primary">
                              Sauvegarder
                            </button>
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
