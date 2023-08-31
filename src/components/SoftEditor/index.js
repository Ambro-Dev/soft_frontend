/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/
// react-quill components
import ReactQuill from "react-quill";

// react-quill styles
import "react-quill/dist/quill.snow.css";

// Custom styles for the MDEditor
import SoftEditorRoot from "components/SoftEditor/SoftEditorRoot";

function MDEditor(props) {
  return (
    <SoftEditorRoot>
      <ReactQuill theme="snow" {...props} />
    </SoftEditorRoot>
  );
}

export default MDEditor;
