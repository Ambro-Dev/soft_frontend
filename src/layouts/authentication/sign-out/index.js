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

const LOGOUT_URL = "/logout";

function Logout() {
  const { socket, setSocket } = useContext(SocketContext);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  const logout = async () => {
    socket.disconnect();
    setSocket(null);
    axios.get(LOGOUT_URL);
    setAuth({});
    navigate("/authentication/sign-in");
  };

  return (
    <CoverLayout
      title="Logout"
      description="Are You suru You want to logout?"
      image={bgImage}
    >
      <Card>
        <SoftBox pt={4} pb={3} px={3}>
          <SoftBox component="form" role="form">
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" onClick={logout} fullWidth>
                Logout
              </SoftButton>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" onClick={goBack} fullWidth>
                Cancle
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </CoverLayout>
  );
}

export default Logout;
