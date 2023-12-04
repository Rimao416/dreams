import React from 'react'
import { Oval } from "react-loader-spinner";
import PropTypes from 'prop-types';
function Button({loading,children}) {
  return (
    <div>
       {loading == false ? <>
                {children}
                </>:   <Oval
                    height={40}
                    width={40}
                    color="#58BBDE"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#A2CDDC"
                    strokeWidth={3}
                    strokeWidthSecondary={3}
                  />}
    </div>
  )
}

Button.propTypes = {
    loading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };
  
export default Button
