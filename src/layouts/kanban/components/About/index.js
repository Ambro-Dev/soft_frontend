/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Gwarant-Service

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

// Wizard application components
import FormField from "layouts/wizard/components/FormField";
import { useState } from "react";
import NewEvent from "../NewCourse";
import { useTranslation } from "react-i18next";

// Images

function About({ setDescription, setName, name, description, setPic }) {
  const { t } = useTranslation("translation", { keyPrefix: "courses" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const savePicture = (avatar) => {
    setPic(avatar);
    setSelectedAvatar(avatar);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <SoftBox sx={{ my: 4 }}>
      <SoftBox width="82%" textAlign="center" mx="auto" my={4}>
        <SoftBox mb={1}>
          <SoftTypography variant="h5" fontWeight="regular">
            {t("courseinfo")}
          </SoftTypography>
        </SoftBox>
        <SoftTypography variant="body2" color="text">
          {t("courseimage")}
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} container justifyContent="center">
            <SoftBox position="relative" height="max-content" mx="auto">
              <SoftAvatar
                src={
                  selectedAvatar
                    ? `${serverUrl}/${selectedAvatar}`
                    : `${serverUrl}/storage/courses/course_images/course_image_02.gif`
                }
                alt="profile picture"
                size="xxl"
                variant="rounded"
                sx={{ height: 120, width: 180 }}
              />
              <SoftBox alt="spotify logo" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
                <Tooltip title="Edit" placement="top">
                  <SoftButton
                    variant="gradient"
                    color="info"
                    size="small"
                    iconOnly
                    onClick={openModal}
                  >
                    <Icon>edit</Icon>
                  </SoftButton>
                </Tooltip>
                <NewEvent open={isModalOpen} onClose={closeModal} setSelectedAvatar={savePicture} />
              </SoftBox>
            </SoftBox>
          </Grid>
          <Grid item xs={12} sm={12}>
            <SoftBox mb={2}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                {t("coursename")}
              </SoftTypography>
              <FormField
                type="text"
                label={t("coursename")}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                {t("coursedesc")}
              </SoftTypography>
              <FormField
                type="text"
                label={t("coursedesc")}
                multiline
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>
    </SoftBox>
  );
}

export default About;
