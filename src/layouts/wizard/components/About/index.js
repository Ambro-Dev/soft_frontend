/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Wizard application components
import FormField from "../FormField";
import { useTranslation } from "react-i18next";

function About({ setDescription, setName, name, description }) {
  const { t } = useTranslation("translation", { keyPrefix: "wizard" });
  return (
    <SoftBox>
      <SoftBox width="82%" textAlign="center" mx="auto" my={4}>
        <SoftBox mb={1}>
          <SoftTypography variant="h5" fontWeight="regular">
            {t("infostart")}
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="body2" color="text">
          {t("infodesc")}
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid item xs={12} sm={12}>
          <SoftBox mb={2}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {t("infoname")}
            </SoftTypography>
            <FormField
              type="text"
              label={t("infoname")}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {t("infodescription")}
            </SoftTypography>
            <FormField
              type="text"
              label={t("infodescription")}
              multiline
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </SoftBox>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default About;
