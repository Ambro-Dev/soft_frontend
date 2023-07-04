/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Grid from "@mui/material/Grid";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import FormField from "../FormField";
import { useTranslation } from "react-i18next";

// Wizard application components

function Address({
  setEventEndDate,
  setEventEndTime,
  setEventStartDate,
  setEventStartTime,
  eventStartDate,
  eventEndDate,
  eventEndTime,
  eventStartTime,
}) {
  const { t } = useTranslation("translation", { keyPrefix: "wizard" });
  return (
    <SoftBox>
      <SoftBox width="80%" textAlign="center" mx="auto" my={4}>
        <SoftBox mb={1}>
          <SoftTypography variant="h5" fontWeight="regular">
            {t("dateifo")}
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="body2" color="text">
          {t("datedesc")}
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {t("startdate")}
            </SoftTypography>
            <FormField
              type="date"
              label="Start date"
              required
              value={eventStartDate}
              onChange={(e) => {
                setEventStartDate(e.target.value);
                setEventEndDate(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {t("starttime")}
            </SoftTypography>
            <FormField
              type="time"
              label="Start time"
              required
              value={eventStartTime}
              onChange={(e) => {
                setEventStartTime(e.target.value);
                if (eventEndTime < e.target.value) setEventEndTime(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {t("enddate")}
            </SoftTypography>
            <FormField
              type="date"
              label="End date"
              required
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {t("endtime")}
            </SoftTypography>
            <FormField
              type="time"
              label="End time"
              required
              value={eventEndTime}
              onChange={(e) => {
                setEventEndTime(e.target.value);
                if (eventStartTime > e.target.value) setEventStartTime(e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default Address;
