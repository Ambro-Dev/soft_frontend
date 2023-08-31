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
import SoftButton from "components/SoftButton";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import PropTypes from "prop-types";

// Images
import { useEffect, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";
import { Icon, Tooltip } from "@mui/material";
import EditCourseImage from "./EditCourseIamge";

function CourseEdit({ courseId, setEditing, handleSave, editing, setPicture }) {
  const { t } = useTranslation("translation", { keyPrefix: "courseedit" });
  const [course, setCourse] = useState();
  const axiosPrivate = useAxiosPrivate();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [pictureUrl, setPictureUrl] = useState();

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const savePicture = (avatar) => {
    setSelectedAvatar(avatar);
    setPicture(avatar);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    axiosPrivate.get(`/courses/${courseId}`).then((response) => {
      setCourse(response.data);
      setPictureUrl(`${serverUrl}/${response.data.pic}`);
    });
  }, []);

  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={12} md={6}>
        <SoftBox display="flex" alignItems="center">
          <SoftBox mr={2} position="relative" height="max-content">
            <SoftAvatar
              size="xxl"
              src={selectedAvatar ? `${serverUrl}/${selectedAvatar}` : pictureUrl}
              alt="course image"
              sx={{ width: "100%", height: "auto" }}
              variant="rounded"
            />
            {editing && (
              <SoftBox alt="edit-tooltip" position="absolute" right={0} bottom={0} mr={-1} mb={-1}>
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
                <EditCourseImage
                  open={isModalOpen}
                  onClose={closeModal}
                  setSelectedAvatar={savePicture}
                />
              </SoftBox>
            )}
          </SoftBox>
          <SoftBox lineHeight={1}>
            <SoftTypography variant="h6" fontWeight="medium">
              {course?.name}
            </SoftTypography>
            <SoftBadge
              variant="gradient"
              color="info"
              size="xs"
              badgeContent={t("badge")}
              container
            />
          </SoftBox>
        </SoftBox>
      </Grid>
      <Grid item xs={12} md={6} sx={{ textAlign: "right" }}>
        {editing ? (
          <SoftButton color="success" onClick={() => handleSave()}>
            {t("save")}
          </SoftButton>
        ) : (
          <SoftButton onClick={() => setEditing(!editing)}>{t("edit")}</SoftButton>
        )}
      </Grid>
    </Grid>
  );
}

CourseEdit.propTypes = {
  courseId: PropTypes.string.isRequired,
  setEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  handleSave: PropTypes.func.isRequired,
  setPicture: PropTypes.func.isRequired,
};

export default CourseEdit;
