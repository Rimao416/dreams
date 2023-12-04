import React from "react";
import {
  Bell,
  Book,
  DollarSign,
  Home,
  Lock,
  PieChart,
  Power,
  RefreshCw,
  Server,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  User,
  Users,
} from "react-feather";
import { Link } from "react-router-dom";
import { InstructorProfileBg, User15 } from "../../imagepath";
import StickyBox from "react-sticky-box";
import { useStateContext } from "../../../context/ContextProvider";

// eslint-disable-next-line react/prop-types
export default function InstructorSidebar({ activeMenu }) {
  const { user } = useStateContext();
  console.log(user);
  return (
    <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
      <StickyBox offsetTop={20} offsetBottom={20}>
        <div className="sideStickyBar">
          <div className="settings-widget dash-profile">
            <div className="settings-menu p-0">
              <div className="profile-bg">
                {/* <h5>Beginner</h5> */}
                <img src={user?.banner} width={"337px"} height={"134px"} alt="" />
                <div className="profile-img">
                  <Link to="/instructor-profile">
                    <img src={user?.photo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="profile-group">
                <div className="profile-name text-center">
                  <h4>
                    <Link to="/instructor-profile">
                      {user?.first_name + " " + user?.last_name}
                    </Link>
                  </h4>
                  <p>{user?.role}</p>
                </div>
                <div className="go-dashboard text-center">
                  <Link to="/add-course" className="btn btn-primary">
                    Créer un nouveau cours
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-widget account-settings feather-icon">
            <div className="settings-menu">
              <h3>TABLEAU DE BORD</h3>
              <ul>
                <li className="nav-item">
                  <Link
                    to="/instructor-dashboard"
                    className={
                      activeMenu === "Dashboard"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Home size={20} /> Tableau de bord
                  </Link>
                </li>
                <li
                  className={
                    activeMenu === "Courses" ? "nav-item active" : "nav-item"
                  }
                >
                  <Link to="/prof-cours" className="nav-link">
                    <Book size={20} /> Mes cours
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/instructor-reviews"
                    className={
                      activeMenu === "Reviews" ? "nav-item active" : "nav-item"
                    }
                  >
                    <Star size={20} /> Avis
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/instructor-earnings"
                    className={
                      activeMenu === "Earnings" ? "nav-item active" : "nav-item"
                    }
                  >
                    <PieChart size={20} /> Gains
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/instructor-orders"
                    className={
                      activeMenu === "Orders" ? "nav-item active" : "nav-item"
                    }
                  >
                    <ShoppingBag size={20} /> Commandes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/instructor-student-grid"
                    className={
                      activeMenu === ("StudentGrid" || "StudentList")
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Users size={20} /> Etudiants
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/instructor-payouts"
                    className={
                      activeMenu === "Payouts" ? "nav-item active" : "nav-item"
                    }
                  >
                    <DollarSign size={20} /> Reversements
                  </Link>
                </li>
                <li className="nav-item">
                
                </li>
              </ul>
              <div className="instructor-title">
                <h3>PARAMÈTRES</h3>
              </div>
              <ul>
                <li className="nav-item">
                  <Link
                    to="/instructor-edit-profile"
                    className={
                      activeMenu === "EditProfile"
                        ? "nav-item active"
                        : "nav-item"
                    }
                  >
                    <Settings size={20} /> Editer le profil
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/profile"
                    className={
                      activeMenu === "Security" ? "nav-item active" : "nav-item"
                    }
                  >
                    <User size={20} /> Securité
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    <Power size={20} /> Déconnexion
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </StickyBox>
    </div>
  );
}
