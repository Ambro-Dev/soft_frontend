/**
=========================================================
* Soft UD - Demo - v4.0.0
=========================================================

* Product Page: https://www.Ambro-Dev.pl/product/soft-ui-dashboard-react
* Copyright 2022 Ambro-Dev (https://www.Ambro-Dev.pl)

Coded by Ambro-Dev

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useRef, useState, useEffect, useContext } from "react";
import useAuth from "hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UD - Demo components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { SocketContext } from "context/socket";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import axios from "api/axios";
import socketio from "socket.io-client";

function SignIn() {
  const { setSocket } = useContext(SocketContext);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const isMountedRef = useRef(true);

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setErrMsg("");

    return () => {
      isMountedRef.current = false;
    };
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_LOGIN_URL,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const userId = response?.data?.id;
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const name = response?.data?.name;
      const surname = response?.data?.surname;
      const picture = response?.data?.picture;
      const studentNumber = response?.data?.studentNumber;
      setAuth({
        userId,
        name,
        email,
        surname,
        roles,
        studentNumber,
        accessToken,
        picture,
      });
      const newSocket = socketio.connect(process.env.REACT_APP_SERVER_URL, { path: "/socket" });
      setSocket(newSocket);
      setEmail("");
      setPassword("");
      if (roles.includes(1001)) {
        navigate("/admin", { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <CoverLayout
      title="Welcome"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="email"
            placeholder="Email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </SoftBox>
        <SoftBox display="flex" alignItems="center">
          <Switch checked={rememberMe} onChange={handleSetRememberMe} />
          <SoftTypography
            variant="button"
            fontWeight="regular"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;Remember me
          </SoftTypography>
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton
            variant="gradient"
            type="submit"
            color="info"
            fullWidth
            onClick={handleSubmit}
          >
            sign in
          </SoftButton>
        </SoftBox>
        <SoftBox mt={3} textAlign="center">
          <SoftTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <SoftTypography
              component={Link}
              to="/authentication/sign-up"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              Sign up
            </SoftTypography>
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
