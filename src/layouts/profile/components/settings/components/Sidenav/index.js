/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useTranslation } from "react-i18next";

function Sidenav() {
  const { t } = useTranslation("translation", { keyPrefix: "settings" });

  const sidenavItems = [
    { icon: "person", label: [t("changepi")], href: "profile" },
    { icon: "lock", label: [t("changepass")], href: "change-password" },
  ];

  const renderSidenavItems = sidenavItems.map(({ icon, label, href }, key) => {
    const itemKey = `item-${key}`;

    return (
      <SoftBox key={itemKey} component="li" pt={key === 0 ? 0 : 1}>
        <SoftTypography
          component="a"
          href={`#${href}`}
          variant="button"
          fontWeight="regular"
          textTransform="capitalize"
          sx={({
            borders: { borderRadius },
            functions: { pxToRem },
            palette: { light },
            transitions,
          }) => ({
            display: "flex",
            alignItems: "center",
            borderRadius: borderRadius.md,
            padding: `${pxToRem(10)} ${pxToRem(16)}`,
            transition: transitions.create("background-color", {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.shorter,
            }),

            "&:hover": {
              backgroundColor: light.main,
            },
          })}
        >
          <SoftBox mr={1.5} lineHeight={1} color="white">
            <Icon fontSize="small">{icon}</Icon>
          </SoftBox>
          {label}
        </SoftTypography>
      </SoftBox>
    );
  });

  return (
    <Card
      sx={{
        borderRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
        position: "sticky",
        top: "1%",
      }}
    >
      <SoftBox
        component="ul"
        display="flex"
        flexDirection="column"
        p={2}
        m={0}
        sx={{ listStyle: "none" }}
      >
        {renderSidenavItems}
      </SoftBox>
    </Card>
  );
}

export default Sidenav;
