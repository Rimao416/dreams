import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StateContext = createContext({});

export const CourseProvider = ({ children }) => {
   const [cours, setCours] = useState({
    title: "",
    description: "",
    user_id: "1",
    tool_id: "1",
    price: 0,
    old_price: 0,
    categorie_id: "",
    image: "",
    video: 0,
  });

//    const [cours, setCours] = useState(null);
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
