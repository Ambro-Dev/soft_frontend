/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { useEffect, useRef, useState, useContext } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import useAxiosPrivate from "hooks/useAxiosPrivate";
import ErrorContext from "context/ErrorProvider";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;

function ChangePassword({ setChngPassword, chngPassword, userId }) {
  const errRef = useRef();
  const axiosPrivate = useAxiosPrivate();

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const { showSuccessNotification } = useContext(ErrorContext);

  const [seePasswords, setSeePasswords] = useState(false);

  const [repeatPwd, setRepeatPwd] = useState("");
  const [validRepeatPwd, setValidRepeatPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setValidRepeatPwd(PWD_REGEX.test(repeatPwd) && pwd === repeatPwd);
  }, [repeatPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, repeatPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = PWD_REGEX.test(pwd);
    const v2 = PWD_REGEX.test(repeatPwd);
    if (pwd !== repeatPwd || !v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const newUser = { id: userId, newPassword: pwd };
      await axiosPrivate.post(process.env.REACT_APP_ADMIN_CHANGE_PASSWORD, newUser);
      setPwd("");
      showSuccessNotification("Password changed");
    } catch (err) {
      if (err?.response) {
        setErrMsg(err.response?.data.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <SoftBox>
      <SoftBox ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </SoftBox>
      <SoftBox
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        mx={2}
        mt={-3}
        p={3}
        mb={1}
        my={3}
        textAlign="start"
      >
        <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Change Password
        </SoftTypography>
        <SoftTypography display="block" variant="button" color="white" my={1}>
          Fill all the fields
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={4} pb={3} px={3}>
        <SoftBox>
          <SoftBox mb={2} display="flex">
            <SoftTypography variant="h6" fontWeight="medium" color="text">
              Password
            </SoftTypography>
            <SoftInput
              type={seePasswords ? "text" : "password"}
              variant="standard"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              fullWidth
              helperText="8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character. Allowed special characters: ! @ # $ % & *"
            />
            <CheckIcon color="success" style={{ display: validPwd ? "block" : "none" }} />
            <CloseIcon color="error" style={{ display: validPwd || !pwd ? "none" : "block" }} />
          </SoftBox>
          <SoftBox mb={2} display="flex">
            <SoftTypography variant="h6" fontWeight="medium" color="text">
              Repeat Password
            </SoftTypography>
            <SoftInput
              type={seePasswords ? "text" : "password"}
              variant="standard"
              onChange={(e) => setRepeatPwd(e.target.value)}
              value={repeatPwd}
              required
              aria-invalid={validRepeatPwd && validPwd === validRepeatPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              fullWidth
              helperText="Must be identical as password above"
            />
            <CheckIcon color="success" style={{ display: validRepeatPwd ? "block" : "none" }} />
            <CloseIcon
              color="error"
              style={{ display: validRepeatPwd || !repeatPwd ? "none" : "block" }}
            />
          </SoftBox>
          <SoftBox mt={4} mb={1} textAlign="end">
            <IconButton
              variant="gradient"
              color="info"
              disabled={!pwd || !repeatPwd}
              onClick={() => setSeePasswords(!seePasswords)}
            >
              {!seePasswords ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </SoftBox>
          <SoftBox mt={4} mb={1} textAlign="start">
            <SoftButton
              variant="gradient"
              color="success"
              disabled={!!(!validPwd || !validRepeatPwd)}
              onClick={handleSubmit}
            >
              Change password
            </SoftButton>
          </SoftBox>
          <SoftBox mt={4} mb={1} textAlign="start">
            <SoftButton
              variant="gradient"
              color="error"
              onClick={() => setChngPassword(!chngPassword)}
            >
              Cancel
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default ChangePassword;
