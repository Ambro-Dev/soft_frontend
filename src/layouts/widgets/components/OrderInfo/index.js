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
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import PropTypes from "prop-types";

// Images
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function OrderInfo({ courseId }) {
  const { t } = useTranslation("translation", { keyPrefix: "editinfo" });
  const navigate = useNavigate();
  const [imageIrl, setImageUrl] = useState();
  const { auth } = useAuth();
  const [teacher, setTeacher] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get(`/courses/${courseId}/teacher`).then((response) => {
      setTeacher(response.data);
    });

    axiosPrivate
      .get(`/profile-picture/users/${auth.userId}/picture`, { responseType: "blob" })
      .then((response) => {
        setImageUrl(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
      });
  }, []);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <SoftBox display="flex" alignItems="center">
          <SoftBox mr={2}>
            <SoftAvatar size="xxl" src={imageIrl} alt="Gold Glasses" />
          </SoftBox>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h6" fontWeight="medium">
              {teacher?.name} {teacher?.surname}
            </SoftTypography>
            <SoftBadge
              variant="gradient"
              color="success"
              size="xs"
              badgeContent={t("badge")}
              container
            />
          </SoftBox>
        </SoftBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        <SoftButton
          variant="gradient"
          color="dark"
          size="small"
          onClick={() => {
            const messageUser = {
              id: teacher._id,
            };
            navigate("/profile/messages", { state: messageUser });
          }}
        >
          {t("sendmessage")}
        </SoftButton>
        <SoftBox mt={0.5}>
          <SoftTypography variant="button" color="text">
            {t("questions")}
          </SoftTypography>
        </SoftBox>
      </Grid>
    </Grid>
  );
}

OrderInfo.propTypes = {
  courseId: PropTypes.string.isRequired,
};

export default OrderInfo;
