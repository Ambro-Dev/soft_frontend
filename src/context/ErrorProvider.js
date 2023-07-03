import React, { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import SoftSnackbar from "components/SoftSnackbar";

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [error, setError] = useState("");
  const [errorTitle, setErrorTitle] = useState("");
  const [info, setInfo] = useState(null);
  const [warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(null);

  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const showErrorNotification = (errorName, errorMessage) => {
    setError(errorMessage);
    setErrorTitle(errorName);
    openErrorSB();
    setTimeout(() => {
      setErrorSB(false);
      setError(null);
    }, 10000); // 10 seconds
  };

  const showInfoNotification = (infoMessage) => {
    setInfo(infoMessage);
    openInfoSB();
    setTimeout(() => {
      setInfoSB(false);
      setInfo(null);
    }, 10000); // 10 seconds
  };

  const showWarningNotification = (warningMessage) => {
    setWarning(warningMessage);
    openWarningSB();
    setTimeout(() => {
      setWarningSB(false);
      setWarning(null);
    }, 10000); // 10 seconds
  };

  const showSuccessNotification = (successMessage) => {
    setSuccess(successMessage);
    openSuccessSB();
    setTimeout(() => {
      setSuccessSB(false);
      setSuccess(null);
    }, 10000); // 10 seconds
  };

  const errorContextValue = useMemo(
    () => ({
      showErrorNotification,
      showInfoNotification,
      showWarningNotification,
      showSuccessNotification,
    }),
    []
  );

  return (
    <ErrorContext.Provider value={errorContextValue}>
      {children}
      {errorSB && (
        <SoftSnackbar
          color="error"
          icon="warning"
          title={errorTitle}
          content={error}
          dateTime=""
          open={errorSB}
          onClose={closeErrorSB}
          close={closeErrorSB}
          bgWhite
        />
      )}
      {warningSB && (
        <SoftSnackbar
          color="warning"
          icon="star"
          title="Warning"
          content={warning}
          dateTime=""
          open={warningSB}
          onClose={closeWarningSB}
          close={closeWarningSB}
          bgWhite
        />
      )}
      {infoSB && (
        <SoftSnackbar
          icon="notifications"
          title="Info"
          content={info}
          dateTime=""
          open={infoSB}
          onClose={closeInfoSB}
          close={closeInfoSB}
        />
      )}
      {successSB && (
        <SoftSnackbar
          color="success"
          icon="check"
          title="Success"
          content={success}
          dateTime=""
          open={successSB}
          onClose={closeSuccessSB}
          close={closeSuccessSB}
          bgWhite
        />
      )}
    </ErrorContext.Provider>
  );
}

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorContext;
