/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import Modal from "@mui/material/Modal";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

function NewEvent(props) {
  const { t } = useTranslation("translation", { keyPrefix: "courses" });
  const serverUrl = process.env.REACT_APP_SERVER_URL;

  const imageOptions = [
    "/storage/courses/course_images/course_image_01.jpg",
    "/storage/courses/course_images/course_image_02.gif",
    "/storage/courses/course_images/course_image_03.gif",
  ];
  const { open, setSelectedAvatar, onClose, selectedAvatar } = props;
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    maxWidth: 380,
    minWidth: 300,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={onClose}
    >
      <SoftBox
        component="form"
        role="form"
        className="modal-form"
        onSubmit={setSelectedAvatar}
        sx={style}
      >
        <SoftBox id="modal-modal-title">{t("avatar")}</SoftBox>
        <SoftBox id="modal-modal-description">
          {imageOptions.map((avatar) => (
            <SoftBox
              sx={{ height: 150 }}
              component="img"
              key={avatar}
              src={`${serverUrl}/${avatar}`}
              alt="Avatar"
              onClick={() => handleAvatarClick(avatar)}
              style={{ border: avatar === selectedAvatar ? "2px solid #333" : "none" }}
            />
          ))}
        </SoftBox>
        <SoftButton onClick={onClose}>{t("close")}</SoftButton>
      </SoftBox>
    </Modal>
  );
}

NewEvent.propTypes = {
  open: PropTypes.bool.isRequired,
  setSelectedAvatar: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewEvent;
