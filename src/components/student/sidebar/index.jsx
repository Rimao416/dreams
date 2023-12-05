import React from "react";
import {
  Bell,
  Calendar,
  Clipboard,
  CreditCard,
  Lock,
  Power,
  RefreshCw,
  Settings,
  Trash2,
  User,
  UserPlus,
} from "react-feather";
import { Link } from "react-router-dom";
import { ProfileBg, User11 } from "../../imagepath";
import { useStateContext } from "../../../context/ContextProvider";

// eslint-disable-next-line react/prop-types
export default function StudentSideBar({ activeMenu }) {
  const { user } = useStateContext();
  console.log(user)
  return (
    <div className="col-xl-3 col-md-4 theiaStickySidebar">
      <div className="settings-widget dash-profile mb-3">
        <div className="settings-menu p-0">
          <div className="profile-bg">
            <img src={user?.banner} alt="" width={"337px"} height={"134px"} />
            <div className="profile-img">
              <Link to="/students-profile">
                <img src={user?.photo} alt="" />
              </Link>
            </div>
          </div>
          <div className="profile-group">
            <div className="profile-name text-center">
              <h4>
                <Link to="/students-profile">
                  {user?.first_name + " " + user?.last_name}
                </Link>
              </h4>
              <p>{user?.role}</p>
            </div>
            <div className="go-dashboard text-center">
              <Link to="/deposit-student-dashboard" className="btn btn-primary">
                Tableau de bord
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="settings-widget account-settings">
        <div className="settings-menu">
          <h3>PARAMETRES</h3>
          <ul>
            <li
              className={
                activeMenu === "EditProfile" ? "nav-item active" : "nav-item"
              }
            >
              <Link to="/setting-edit-profile" className="nav-link">
                <i>
                  <Settings size={20} />{" "}
                </i>{" "}
                Editer
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/setting-student-security"
                className={
                  activeMenu === "Security" ? "nav-item active" : "nav-item"
                }
              >
                <i>
                  <User size={20} />
                </i>{" "}
                Securité
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/setting-student-invoice"
                className={
                  activeMenu === "Invoice" ? "nav-item active" : "nav-item"
                }
              >
                <i>
                  <Clipboard size={20} />
                </i>{" "}
                Facture
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/login" className="nav-link">
                <i>
                  <Power size={20} />
                </i>{" "}
                Déconnexion
              </Link>
            </li>
            {activeMenu === "Ticket" ? (
              <li className="nav-item active">
                <Link to="/login" className="nav-link">
                  <i>
                    <Clipboard size={20} />
                  </i>{" "}
                  Support Tickets
                </Link>
              </li>
            ) : null}
          </ul>
     
        </div>
      </div>
    </div>
  );
}
