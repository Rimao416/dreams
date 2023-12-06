import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../footer";
import { SendIcon, User2 } from "../../imagepath";
import CourseMenu from "../courseMenu";
import StudentHeader from "../header";
import { useStateContext } from "../../../context/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getUsersConversation,
  getUsersMessage,
  sendMessage,
} from "../../../redux/slice/studentSlice";
export default function CourseMessage() {
  const [content, setcontent] = useState({
    message: "",
    receiver_id: 0,
  });
  const dispatch = useDispatch();
  const { user } = useStateContext();
  const [profile, setProfile] = useState(null);
  const { messages, conversations } = useSelector(
    (state) => state.studentReducer
  );
  useEffect(() => {
    dispatch(getUsersMessage()).then((result) => {
      console.log(result.payload.data[0]);
      setProfile(result.payload.data[0]);
      dispatch(getUsersConversation(result.payload.data[0].id));
    });
  }, []);

  const handleChange = (event) => {
    useState(event.target.value);
  };
  useEffect(() => {
    // Démarrez l'intervalle dès que le composant est monté
    const intervalId = setInterval(() => {
      // Assurez-vous que profile est défini avant d'effectuer la requête
      if (profile) {
        dispatch(getUsersConversation(profile.id)).then((result) => {
          console.log(result);
        });
      }
    }, 1000); // Interval en millisecondes (1 seconde)

    // Nettoyez l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [dispatch, profile]); // Assurez-vous de lister toutes les dépendances
  const getConversation = (user) => {
    setProfile(user);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setcontent({ ...content, receiver_id: profile.id });
    dispatch(
      sendMessage({ content: content.message, receiver_id: profile.id })
    ).then((result) => {
      console.log(result);
    });
    setcontent({ ...content, message: "" });
    // RECUPERER L'ID
  };

  // const getDatas = (user) => {

  // };

  return (
    <div className="main-wrapper">
      <StudentHeader />

      <div className="course-student-header">
        <div className="container">
          <div className="student-group">
            <div className="course-group ">
              <div className="course-group-img d-flex">
                <img
                  src={user?.photo}
                  alt=""
                  className="img-fluid"
                  width={"300px"}
                  height={"300px"}
                />
                <div className="d-flex align-items-center">
                  <div className="course-name">
                    <h4>
                      <Link to="/students-profile">
                        {user?.first_name + " " + user?.last_name}
                      </Link>
                    </h4>
                    <p>{user?.role}</p>
                  </div>
                </div>
              </div>
              <div className="course-share ">
                <Link to="/setting-edit-profile" className="btn btn-primary">
                  Paramètres du compte
                </Link>
              </div>
            </div>
          </div>
          <CourseMenu activeMenu={"Messages"} />
        </div>
      </div>
      <section className="page-content course-sec course-message">
        <div className="container">
          <div className="student-widget message-student-widget">
            <div className="student-widget-group">
              <div className="col-md-12">
                <div className="chat-window">
                  <div className="chat-cont-left">
                    <div className="chat-users-list">
                      <div className="chat-scroll">
                        {messages &&
                          messages?.map((message) => (
                            <>
                              {" "}
                              <Link
                                to="#;"
                                className="media d-flex"
                                key={message.id}
                              >
                                <div className="media-img-wrap flex-shrink-0">
                                  <div className="avatar avatar-away">
                                    <img
                                      src={message.photo}
                                      alt="User Image"
                                      className="avatar-img rounded-circle"
                                    />
                                  </div>
                                </div>
                                <div className="media-body flex-grow-1">
                                  <div onClick={() => getConversation(message)}>
                                    <div className="user-name">
                                      {message.first_name +
                                        " " +
                                        message.last_name}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </>
                          ))}
                      </div>
                    </div>
                  </div>
                  {profile ? (
                    <div className="chat-cont-right">
                      <div className="chat-header">
                        <Link
                          id="back_user_list"
                          to="#"
                          className="back-user-list"
                        >
                          <i className="material-icons">chevron_left</i>
                        </Link>
                        <div className="media d-flex">
                          <div className="media-img-wrap flex-shrink-0">
                            <div className="avatar avatar-online">
                              <img
                                src={profile?.photo}
                                alt="User Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body flex-grow-1">
                            <div className="user-name">
                              {profile?.first_name + " " + profile?.last_name}{" "}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat-body">
                        <div className="chat-scroll">
                          <ul className="list-unstyled">
                            {conversations &&
                              conversations?.map((conversation) => (
                                <>
                                  <li
                                    // SI JE SUIS LE SENDER,
                                    className={`media ${
                                      conversation.sender === user?.pseudo
                                        ? "sent"
                                        : "received"
                                    } d-flex`}
                                    key={conversation.id}
                                  >
                                    <div className="media-body flex-grow-1">
                                      <div className="msg-box">
                                        <div className="msg-bg">
                                          <p>{conversation.content}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </>
                              ))}
                          </ul>
                        </div>
                      </div>
                      <div className="chat-footer">
                        <form className="input-group" onSubmit={handleSubmit}>
                          <input
                            type="text"
                            className="input-msg-send form-control"
                            placeholder="Entrer votre message..."
                            value={content.message}
                            onChange={(e) =>
                              setcontent({
                                ...content,
                                message: e.target.value,
                              })
                            }
                          />
                          <button
                            type="submit"
                            className="btn btn-primary msg-send-btn rounded-pill hover0"
                          >
                            <img src={SendIcon} alt="" />
                          </button>
                        </form>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
