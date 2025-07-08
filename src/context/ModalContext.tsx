import { createContext, useContext } from "react";

interface ModalContextType {
  openAuthModal: (mode: "login" | "signup") => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
}

export default ModalContext;
