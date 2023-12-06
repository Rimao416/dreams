import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import Footer from "../../footer";
import StudentHeader from "../header";
import StudentSideBar from "../sidebar";
import { useStateContext } from "../../../context/ContextProvider";
import { API } from "../../../config";
import { toast } from "react-toastify";
import Button from "../../Button";
import { InstructorHeader } from "../../instructor/header";

export default function StudentEditProfile() {
  const [loading, setLoading] = useState(false);
  const [picLoad, setPicLoad] = useState({
    pro: false,
    banner: false,
  });
  const { user, setUser } = useStateContext();
  const [profile, setProfile] = useState({});
  useEffect(() => {
    setProfile(user);
  }, [user]);
  const [picture, setPicture] = useState({
    photo: "",
    banner: "",
  });

  // const [profile,setProfile]=useState({
  //   first_name:user?.first_name,
  //   last_name:user?.last_name,
  //   email:user?.email,
  // })
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  // const handleFileChange=(e)=>{
  //   console.log(e.target.name)
  //   const {files}=e.target
  //   files[0] && setProfile({ ...profile, photo: files[0] });
  //   if (files) {
  //     setPicture({ ...picture, photo: URL.createObjectURL(files[0]) });
  //     // setVideo(URL.createObjectURL(files[0]));
  //   }
  //   // setProfile({...profile,[e.target.name]:e.target.files[0]})
  // }
  // const handleBannerChange=(e)=>{
  //   console.log(e.target.name)
  //   const {files}=e.target
  //   files[0] && setProfile({ ...profile, photo: files[0] });
  //   if (files) {
  //     setPicture({ ...picture, photo: URL.createObjectURL(files[0]) });
  //     // setVideo(URL.createObjectURL(files[0]));
  //   }
  //   // setProfile({...profile,[e.target.name]:e.target.files[0]})
  // }
  const handleFileChange = (name, e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setProfile({ ...profile, [name]: files[0] });
      setPicture({ ...picture, [name]: URL.createObjectURL(files[0]) });
    }
  };
  const [setCountry] = useState(null);
  const options = [
    { label: "Select Country", value: "Select" },
    { label: "India", value: "India" },
    { label: "America", value: "America" },
    { label: "London", value: "London" },
  ];
  const style = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "white",
      width: "100%",
      height: "40px",
      color: "black",
      minHeight: "40px",
      paddingLeft: "5px",
      // This line disable the blue border
      boxShadow: state.isFocused ? 0 : 0,
      borderRadius: state.isSelected ? "0" : "10px",
      fontSize: "14px",
      "&:hover": {
        cursor: "pointer",
      },
      outline: "none",
    }),
    menu: (base) => ({ ...base, marginTop: "0px" }),
    menuList: (base) => ({ ...base, padding: "0" }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#FFDEDA" : "white",
      color: "black",
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#FFDEDA",
        // #dddddd
      },
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: "black",
      transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
      transition: "250ms",
    }),
  };
  const profilePic = async (event) => {
    setPicLoad({ ...picLoad, pro: true });
    event.preventDefault();
    console.log(profile);
    console.log(user);
    // create form
    const formData = new FormData();
    // // update formData
    formData.append("photo", profile?.photo);
    // formData.append("photo_floue")
    try {
      const response = await API.post(`/updatePhoto`, formData);
      if (response.status == 200) {
        toast.success("Modification effectuée avec succès");
        setUser({ ...user, photo: profile?.photo.name });
        window.location.reload();
        setPicLoad({ ...picLoad, pro: false });
      }
      // console.log("s");
      console.log(response);
    } catch (error) {
      console.log(error);
      setPicLoad({ ...picLoad, pro: false });
    }
  };
  const handleBanner = async (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setProfile({ ...profile, banner: files[0] });
      setPicture({ ...picture, banner: URL.createObjectURL(files[0]) });
    }
  };
  const bannerPic = async (event) => {
    setPicLoad({ ...picLoad, ban: true });
    event.preventDefault();

    // create form
    const formData = new FormData();
    // // update formData
    formData.append("banner", profile?.banner);
    try {
      const response = await API.post(`/updateBanner`, formData);
      if (response.status == 200) {
        toast.success("Modification effectuée avec succès");
        setUser({ ...user, banner: profile?.banner.name });
        window.location.reload();
        setPicLoad({ ...picLoad, ban: false });
      }
      // console.log("s");
      console.log(response);
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setPicLoad({ ...picLoad, ban: false });
    }
    // setLoading(false);
  };
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const modifiedValues = Object.keys(profile).reduce((acc, key) => {
        if (profile[key] !== user[key]) {
          acc[key] = profile[key];
        }
        return acc;
      }, {});

      if (Object.keys(modifiedValues).length === 0) {
        // Aucune valeur modifiée, pas besoin d'envoyer de requête
        toast.info("Aucune modification détectée");
        setLoading(false);
        return;
      }

      const response = await API.put(`/users/${user?.id}`, modifiedValues);
      console.log(response);
      // const dataSen
      if (response.status === 200) {
        setUser(response.data.data);
        toast.success("Modification effectuée avec succès");
        setLoading(false);
        // window.location.reload()
      }
    } catch (error) {
      console.log(error);
      Object.values(error.response.data.data).forEach((errorArray) => {
        toast.error(errorArray[0]);
      });
      setLoading(false);
    }
  };
  return (
    <div className="main-wrapper">
      {/* <StudentHeader activeMenu={"Profile"} /> */}
      <InstructorHeader />
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <StudentSideBar activeMenu={"EditProfile"} />
            {/* Sidebar */}

            {/* Profile Details */}
            <div className="col-xl-9 col-md-8">
              <div className="settings-widget profile-details">
                <div className="settings-menu p-0">
                  <div className="profile-heading">
                    <h3>Informations Profil</h3>
                    {/* <p>
                      You have full control to manage your own account setting.
                    </p> */}
                  </div>

                  <div className="checkout-form personal-address add-course-info">
                    <div className="personal-info-head">
                      <h4>Photo de Profil</h4>
                      {/* <p>Edit your personal information and address.</p> */}
                    </div>
                    <form onSubmit={profilePic}>
                      <div className="course-group mb-0 d-flex">
                        <div className="course-group-img d-flex align-items-center justify-content-between">
                          <input
                            type="file"
                            name="photo"
                            onChange={(e) => handleFileChange("photo", e)}
                            id=""
                            className="form-control"
                          />
                          {/* <div className="course-name">
                          <h4>
                            <Link to="instructor-profile">Your avatar</Link>
                          </h4>
                          <p>PNG or JPG no bigger than 800px wide and tall.</p>
                        </div> */}
                        </div>
                        <div className="profile-share d-flex align-items-center justify-content-center">
                          {picture?.photo && (
                            <>
                              <Button loading={picLoad?.pro}>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Mettre à jour
                                </button>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="checkout-form personal-address add-course-info">
                    <div className="personal-info-head">
                      <h4>Photo de Couverture</h4>
                      {/* <p>Edit your personal information and address.</p> */}
                    </div>
                    <form onSubmit={bannerPic}>
                      <div className="course-group mb-0 d-flex">
                        <div className="course-group-img d-flex align-items-center justify-content-between">
                          <input
                            type="file"
                            name="banner"
                            onChange={(e) => handleFileChange("banner", e)}
                            id=""
                            className="form-control"
                          />
                          {/* <div className="course-name">
                          <h4>
                            <Link to="instructor-profile">Your avatar</Link>
                          </h4>
                          <p>PNG or JPG no bigger than 800px wide and tall.</p>
                        </div> */}
                        </div>
                        <div className="profile-share d-flex align-items-center justify-content-center">
                          {picture?.banner && (
                            <>
                              <Button loading={picLoad?.banner}>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Mettre à jour
                                </button>
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="checkout-form personal-address add-course-info">
                    <div className="personal-info-head">
                      <h4>Informations personnelles</h4>
                      {/* <p>Edit your personal information and address.</p> */}
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Nom</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your first Name"
                              name="first_name"
                              value={profile?.first_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Prenom</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your last Name"
                              name="last_name"
                              value={profile?.last_name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Pseudo</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Entrer votre pseudo"
                              name="pseudo"
                              value={profile?.pseudo}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label className="form-control-label">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter your Email"
                              name="email"
                              disabled={true}
                              value={profile?.email}
                              // onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="update-profile">
                          <Button loading={loading}>
                            <button type="submit" className="btn btn-primary">
                              Modifier
                            </button>
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Details */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
