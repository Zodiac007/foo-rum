import { useState } from "react";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import AuthModal from "../AuthModal";
import ModalContext from "../../context/ModalContext";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const openAuthModal = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const switchMode = (mode: "login" | "signup") => {
    setAuthMode(mode);
  };

  return (
    <ModalContext.Provider value={{ openAuthModal }}>
      <Navbar onLoginClick={() => openAuthModal("login")} />
      <main>{children}</main>
      {authModalOpen && (
        <AuthModal
          mode={authMode}
          onClose={closeAuthModal}
          switchMode={switchMode}
        />
      )}
    </ModalContext.Provider>
  );
}
