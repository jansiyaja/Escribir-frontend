import React, { createContext, useMemo, useContext, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

// Custom hook to use the socket context
export const useSocket = (): Socket | null => {
  const socket = useContext(SocketContext);
  return socket;
};

// Define types for the props of SocketProvider
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = (props) => {
  const socket = useMemo(() => io("http://localhost:3000"), []);

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
