import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "context/AuthProvider";

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { SocketContext } from "context/socket";

// Images
import bgImage from "assets/images/curved-images/curved14.jpg";
import axios from "api/axios";
import CoverLayout from "../components/CoverLayout";
import { useTranslation } from "react-i18next";
import useAuth from "hooks/useAuth";

function Logout() {
  const { t } = useTranslation("translation", { keyPrefix: "logout" });
  const { socket, setSocket } = useContext(SocketContext);
  const { setAuth } = useContext(AuthContext);
  const { setPersist } = useAuth();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const logout = async () => {
    socket?.disconnect();
    setSocket(null);
    axios.get(process.env.REACT_APP_LOGOUT_URL);
    setPersist(false);
    setAuth({});
    navigate("/authentication/sign-in");
  };

  return (
    <CoverLayout title="Logout" description="Are You suru You want to logout?" image={bgImage}>
      <Card>
        <SoftBox pt={4} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" onClick={logout} fullWidth>
                {t("logout")}
              </SoftButton>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" onClick={goBack} fullWidth>
                {t("cancel")}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </CoverLayout>
  );
}

export default Logout;
