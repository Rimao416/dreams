import React from "react";
import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";
function ButtonLoader({ loading, className = "btn btn-start", children }) {
  return (
    <button className={className} disabled={loading}>
      {loading == true ? (
        <Oval
          height={30}
          width={30}
          color="#58BBDE"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#A2CDDC"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      ) : (
        children
      )}
    </button>
  );
}

ButtonLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonLoader;
