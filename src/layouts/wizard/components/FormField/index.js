/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// prop-type is a library for typechecking of props
import PropTypes from "prop-types";

// Distance Learning React components
import SoftInput from "components/SoftInput";

function FormField({ label, ...rest }) {
  return <SoftInput variant="standard" label={label} fullWidth {...rest} />;
}

// typechecking props for FormField
FormField.propTypes = {
  label: PropTypes.string.isRequired,
};

export default FormField;
