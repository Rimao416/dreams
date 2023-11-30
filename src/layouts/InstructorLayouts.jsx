import React from "react";
import { InstructorHeader } from "../components/instructor/header";
import Footer from "../components/footer";

function InstructorLayouts({ value, children }) {
  return (
    <div className="main-wrapper">
      <InstructorHeader activeMenu={value} />
      {children}
      <Footer />
    </div>
  );
}

export default InstructorLayouts;
