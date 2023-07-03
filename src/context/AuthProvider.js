import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  const persistValues = useMemo(
    () => ({ auth, setAuth, persist, setPersist }),
    [auth, setAuth, persist, setPersist]
  );

  return <AuthContext.Provider value={persistValues}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
