/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.soft.ambro.dev
* Copyright 2022 Ambro-Dev (https://www.ambro.dev)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UD - Demo components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UD - Demo base styles
import typography from "assets/theme/base/typography";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;

  const renderLinks = () =>
    links.map((link) => (
      <SoftBox key={link.name} component="li" px={2} lineHeight={1}>
        <Link href={link.href} target="_blank">
          <SoftTypography variant="button" fontWeight="regular" color="text">
            {link.name}
          </SoftTypography>
        </Link>
      </SoftBox>
    ));

  return (
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
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; 2022, made with
        <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </SoftBox>
        by
        <Link href={href} target="_blank">
          <SoftTypography variant="button" fontWeight="medium">
            &nbsp;{name}&nbsp;
          </SoftTypography>
        </Link>
        for a better web.
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
        {renderLinks()}
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "https://www.ambro.dev/", name: "Ambro-Dev" },
  links: [
    { href: "https://www.ambro.dev/", name: "Ambro-Dev" },
    { href: "https://www.mans.org.pl", name: "MANS" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
