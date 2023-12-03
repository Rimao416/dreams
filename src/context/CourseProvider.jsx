import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const StateContext = createContext({});

export const CourseProvider = ({ children }) => {
  const [cours, setCours] = useState({});
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
