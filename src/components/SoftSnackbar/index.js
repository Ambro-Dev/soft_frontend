/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import Divider from "@mui/material/Divider";
import Fade from "@mui/material/Fade";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Custom styles for the MDSnackbar
import SoftSnackbarIconRoot from "components/SoftSnackbar/SoftSnackbarIconRoot";

// Distance Learning React context

function SoftSnackbar({ color, icon, title, dateTime, content, close, bgWhite, ...rest }) {
  let titleColor;
  let dateTimeColor;
  let dividerColor;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = "dark";
    dividerColor = false;
  } else if (color === "light") {
    titleColor = "inherit";
    dateTimeColor = "inherit";
    dividerColor = false;
  } else {
    titleColor = "white";
    dateTimeColor = "white";
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      {...rest}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <SoftBox
        variant={bgWhite ? "contained" : "gradient"}
        bgColor={bgWhite ? "white" : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: ({ palette }) => palette[color] || palette.white.main,
        }}
      >
        <SoftBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <SoftSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
              {icon}
            </SoftSnackbarIconRoot>
            <SoftTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </SoftTypography>
          </SoftBox>
          <SoftBox display="flex" alignItems="center" lineHeight={0}>
            <SoftTypography variant="caption" color={dateTimeColor}>
              {dateTime}
            </SoftTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  bgWhite || color === "light" ? dark.main : white.main,
                fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                cursor: "pointer",
                marginLeft: 2,
                transform: "translateY(-1px)",
              }}
              onClick={close}
            >
              close
            </Icon>
          </SoftBox>
        </SoftBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <SoftBox
          p={1.5}
          sx={{
            fontSize: ({ typography: { size } }) => size.sm,
            color: ({ palette: { white, text } }) => {
              let colorValue = bgWhite || color === "light" ? text.main : white.main;

              return colorValue;
            },
          }}
        >
          {content}
        </SoftBox>
      </SoftBox>
    </Snackbar>
  );
}

// Setting default values for the props of MDSnackbar
SoftSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for MDSnackbar
SoftSnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default SoftSnackbar;
