/* eslint-disable react/prop-types */
/**
=========================================================
* Distance Learning React - v1.1.0
=========================================================

Coded by Ambro-Dev

*/

// @mui material components
import Card from "@mui/material/Card";

// Distance Learning React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import { FormControl, InputLabel, MenuItem, Select, Snackbar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axios from "api/axios";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&*]).{8,24}$/;
const NAME_REGEX = /^[a-zA-Z]+$/;
const NUMBER_REGEX = /^\d+$/;

function NewUser({ visible, setVisible, loading, setLoading }) {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [surname, setSurname] = useState("");
  const [validSurname, setValidSurname] = useState(false);

  const [studentNumber, setStudentNumber] = useState("");
  const [validStudentNumber, setValidStudentNumber] = useState(false);

  const [successSB, setSuccessSB] = useState(false);
  const [role, setRole] = useState({});
  const emailRef = useRef();
  const errRef = useRef();
  const [visibleRole, setVisibleRole] = useState("");

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const renderSuccessSB = (
    <Snackbar
      color="success"
      icon="check"
      title="User Created"
      content="User created successfully"
      dateTime="now"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name]);

  useEffect(() => {
    setValidStudentNumber(NUMBER_REGEX.test(studentNumber));
  }, [studentNumber]);

  useEffect(() => {
    setValidSurname(NAME_REGEX.test(surname));
  }, [surname]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const newUser = { email, password: pwd, name, surname, roles: role, studentNumber };
      await axios.post(process.env.REACT_APP_REGISTER_URL, JSON.stringify(newUser), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setEmail("");
      setPwd("");
      setName("");
      setSurname("");
      setStudentNumber("");
      setRole({});
      setVisibleRole("");
      setLoading(!loading);
      openSuccessSB();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Emailname Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const handleRoleChange = (event) => {
    setVisibleRole(event.target.value);
    if (event.target.value === "Student") {
      setRole({ Student: 1984 });
      if (studentNumber === "") setValidStudentNumber(false);
    }
    if (event.target.value === "Teacher") {
      setRole({ Teacher: 5150 });
      setStudentNumber("");
      setValidStudentNumber(true);
    }
    if (event.target.value === "Admin") {
      setRole({ Admin: 1001 });
      setStudentNumber("");
      setValidStudentNumber(true);
    }
  };

  return (
    <Card sx={{ marginTop: 3 }}>
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
        textAlign="center"
      >
        <SoftTypography variant="h4" fontWeight="medium" color="white" mt={1}>
          Create new user
        </SoftTypography>
        <SoftTypography display="block" variant="button" color="white" my={1}>
          Fill all the fields
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={4} pb={3} px={3}>
        <FormControl required sx={{ paddingBottom: 2 }} fullWidth>
          <InputLabel id="demo-simple-select-label">Role</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            sx={{ paddingTop: 2, paddingBottom: 2 }}
            value={visibleRole}
            label="Role"
            onChange={handleRoleChange}
          >
            <MenuItem value="Student">Student</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </Select>
        </FormControl>
        <SoftBox component="form" role="form">
          <SoftBox mb={2} display="flex" flexDirection="column">
            <SoftTypography variant="h6" fontWeight="medium" color="text">
              Name
            </SoftTypography>
            <SoftInput
              type="text"
              variant="standard"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <CheckIcon color="success" style={{ display: validName ? "block" : "none" }} />
            <CloseIcon color="error" style={{ display: validName || !name ? "none" : "block" }} />
          </SoftBox>
          <SoftBox mb={2} display="flex" flexDirection="column">
            <SoftTypography variant="h6" fontWeight="medium" color="text">
              Surname
            </SoftTypography>
            <SoftInput
              type="text"
              variant="standard"
              value={surname}
              required
              onChange={(e) => setSurname(e.target.value)}
              fullWidth
            />
            <CheckIcon color="success" style={{ display: validSurname ? "block" : "none" }} />
            <CloseIcon
              color="error"
              style={{ display: validSurname || !surname ? "none" : "block" }}
            />
          </SoftBox>
          <SoftBox
            mb={2}
            display="flex"
            style={{
              display: visibleRole === "Teacher" || visibleRole === "Admin" ? "none" : "block",
            }}
            flexDirection="column"
          >
            <SoftTypography variant="h6" fontWeight="medium" color="text">
              Student Number
            </SoftTypography>
            <SoftInput
              type="text"
              variant="standard"
              value={studentNumber}
              onChange={(e) => setStudentNumber(e.target.value)}
              fullWidth
              required={role === "Student"}
            />
            <CheckIcon color="success" style={{ display: validStudentNumber ? "block" : "none" }} />
            <CloseIcon
              color="error"
              style={{ display: validStudentNumber || !studentNumber ? "none" : "block" }}
            />
          </SoftBox>
          <SoftBox mb={2} display="flex" flexDirection="column">
            <SoftTypography variant="h6" fontWeight="medium" color="text">
              Email
            </SoftTypography>
            <SoftInput
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailRef}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              variant="standard"
              fullWidth
            />
            <CheckIcon color="success" style={{ display: validEmail ? "block" : "none" }} />
            <CloseIcon color="error" style={{ display: validEmail || !email ? "none" : "block" }} />
          </SoftBox>

          <SoftBox mb={2} display="flex" flexDirection="column">
            <SoftTypography variant="h6" fontWeight="medium" color="text">
              Password
            </SoftTypography>
            <SoftInput
              type="password"
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
          <SoftBox mt={4} mb={1}>
            <SoftButton
              variant="gradient"
              color="success"
              disabled={
                !!(
                  !validEmail ||
                  !validPwd ||
                  !name ||
                  !surname ||
                  !role ||
                  !validName ||
                  !validSurname ||
                  !validStudentNumber
                )
              }
              onClick={handleSubmit}
              fullWidth
            >
              Create
            </SoftButton>
          </SoftBox>
          <SoftBox mt={4} mb={1} textAlign="center">
            <SoftButton
              variant="gradient"
              color="error"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              Cancel
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </SoftBox>
      {renderSuccessSB}
    </Card>
  );
}

export default NewUser;
