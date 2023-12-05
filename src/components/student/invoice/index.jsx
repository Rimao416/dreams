import React from "react";
import StudentHeader from "../header";
import Footer from "../../footer";
import StudentSideBar from "../sidebar";
import { Link } from "react-router-dom";
import { Download } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "../../../context/ContextProvider";
import { useEffect } from "react";
import { getStudentPaiement } from "../../../redux/slice/studentSlice";

export default function StudentInvoice() {
  const dispatch = useDispatch();
  // const { user } = useStateContext();
  useEffect(() => {
    dispatch(getStudentPaiement()).then((result) => {
      console.log(result);
    });
  }, []);
  const { payments } = useSelector((state) => state.studentReducer);
  return (
    <div className="main-wrapper">
      <StudentHeader activeMenu={"Invoice"} />
      {/* Student Dashboard */}
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <StudentSideBar activeMenu={"Invoice"} />
            {/* Sidebar */}

            {/* Profile Details */}
            <div className="col-xl-9 col-md-8">
              <div className="settings-widget profile-details">
                <div className="settings-inner-blk p-0">
                  <div className="profile-heading">
                    <h3>Historique des paiements</h3>
                  </div>
                  <div className="comman-space pb-0">
                    <div className="settings-invoice-blk table-responsive">
                      {/* Invoice info */}
                      <table className="table table-borderless mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>date</th>
                            <th>PRIX</th>
                            <th>STATUT</th>
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payments &&
                            payments.map((payment) => (
                              <React.Fragment key={payment._id}>
                                <tr>
                                  <td>
                                    <Link
                                      to="view-invoice"
                                      className="invoice-no"
                                    >
                                      #1001
                                    </Link>
                                  </td>
                                  <td>{payment.date}</td>
                                  <td>{payment.price}</td>
                                  <td>
                                    <span className="badge status-completed">
                                      {/* {payment.status} */}
                                      Payé
                                    </span>
                                  </td>
                                  {/* <td className="d-flex ">
                                    <Link to="#;" className="btn-style">
                                      <Download />
                                    </Link>
                                  </td> */}
                                </tr>
                              </React.Fragment>
                            ))}
                        </tbody>
                      </table>
                      {/* Invoice info */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Details */}
          </div>
        </div>
      </div>
      {/* Student Dashboard */}
      <Footer />
    </div>
  );
}
