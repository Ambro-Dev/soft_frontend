import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Distance Learning React base styles
import typography from "assets/theme/base/typography";

function FooterAdmin({ light }) {
  const { size } = typography;

  return (
    <SoftBox position="relative" width="100%" bottom={0} py={4}>
      <Container>
        <SoftBox
          width="100%"
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <SoftBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? "white" : "text"}
            fontSize={size.sm}
          >
            &copy; 2022, made by Gwarant-Service
          </SoftBox>
          <SoftBox
            component="ul"
            sx={({ breakpoints }) => ({
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              listStyle: "none",
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up("lg")]: {
                mt: 0,
              },
            })}
          >
            <SoftBox component="li" pr={2} lineHeight={1}>
              <Link href="https://gwarant-service.pl/" target="_blank">
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Gwarant-Service
                </SoftTypography>
              </Link>
            </SoftBox>
            <SoftBox component="li" px={2} lineHeight={1}>
              <Link href="https://gwarant-service.pl/" target="_blank">
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  About Us
                </SoftTypography>
              </Link>
            </SoftBox>
            <SoftBox component="li" px={2} lineHeight={1}>
              <Link href="https://gwarant-service.pl/" target="_blank">
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  Blog
                </SoftTypography>
              </Link>
            </SoftBox>
            <SoftBox component="li" pl={2} lineHeight={1}>
              <Link href="https://gwarant-service.pl/" target="_blank">
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? "white" : "dark"}
                >
                  License
                </SoftTypography>
              </Link>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Container>
    </SoftBox>
  );
}

// Setting default props for the Footer
FooterAdmin.defaultProps = {
  light: false,
};

// Typechecking props for the Footer
FooterAdmin.propTypes = {
  light: PropTypes.bool,
};

export default FooterAdmin;
