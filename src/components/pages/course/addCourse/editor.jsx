import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PropTypes from "prop-types"
const TextEditor = ({onChange}) => {
  return (
    <CKEditor
      editor={ClassicEditor}
    //   onReady={(editor) => {
    //     // You can store the "editor" and use when it is needed.
       
    //   }}
      onChange={onChange}
    //   onBlur={(event, editor) => {
    //     console.log("Blur.", editor);
    //   }}
    //   onFocus={(event, editor) => {
    //     console.log("Focus.", editor);
    //   }}
    />
  );
};
TextEditor.propTypes = {
  onChange: PropTypes.func.isRequired, // onChange doit être une fonction et est obligatoire
};

export default TextEditor;
