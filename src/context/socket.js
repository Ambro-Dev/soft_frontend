import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const SocketContext = createContext({});

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);

  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
