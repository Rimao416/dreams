import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Error3, logo } from "../../../imagepath";
import { useParams } from "react-router-dom";
import { API } from "../../../../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const UnderConstruction = () => {
  const navigate = useNavigate();
  // const getConfirmPaiements = async (id) => {
  //   const response = await API.get(`/confirmPayment/${id}`);
  //   return response.data;
  // };
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      API.get(`/confirmPayment/${id}`).then((response) => {
        toast.info(response.data.message);
        navigate("/course-student");
      });
      // console.log(reponse);
    }
  }, [id]);
  useEffect(() => {
    document.body.classList.add("error-page");
    return () => document.body.classList.remove("error-page");
  }, []);

  return (
    <>
      <div className="main-wrapper"></div>
    </>
  );
};

export default UnderConstruction;
