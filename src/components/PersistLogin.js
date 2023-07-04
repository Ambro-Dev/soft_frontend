import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ErrorContext from "context/ErrorProvider";
import { Backdrop, CircularProgress } from "@mui/material";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "hooks/useAuth";

function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  const { showErrorNotification } = useContext(ErrorContext);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
        if (err.response.status === 401)
          showErrorNotification("Time out", "You have been logged out");
        else showErrorNotification("Error", err.message);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default PersistLogin;
