/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components

// Authentication layout components

// Images
import bgImage from "assets/images/curved-images/white-curved.jpeg";
import { useContext, useState } from "react";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import CoverLayout from "../components/CoverLayout";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import ErrorContext from "context/ErrorProvider";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const { showErrorNotification, showSuccessNotification } = useContext(ErrorContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    showSuccessNotification("You will receive an e-mail in maximum 60 seconds");
  };
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <SoftBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <SoftTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Reset Password
          </SoftTypography>
          <SoftTypography display="block" variant="button" color="white" my={1}>
            You will receive an e-mail in maximum 60 seconds
          </SoftTypography>
        </SoftBox>
        <SoftBox pt={4} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={4}>
              <SoftInput
                type="email"
                label="Enter your email"
                variant="standard"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </SoftBox>
            <SoftBox mt={6} mb={1}>
              <SoftButton variant="gradient" type="submit" color="info" fullWidth>
                reset
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPassword;
