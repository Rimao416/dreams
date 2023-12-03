import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StateContext = createContext({});

export const CourseProvider = ({ children }) => {
   const [cours, setCours] = useState({
    title: null,
    description: "",
    user_id: "1",
    tool_id: "1",
    price: null,
    old_price: null,
    categorie_id: "",
    image: "",
    video: null,
  });
//    const [cours, setCours] = useState({
//     title: null,
//     description: "",
//     user_id: "1",
//     tool_id: "1",
//     price: null,
//     old_price: null,
//     categorie_id: "",
//     image: "",
//     video: null,
//   });
  return (
    <StateContext.Provider
      value={{
        cours,
        setCours,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

CourseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useStateContext = () => useContext(StateContext);
