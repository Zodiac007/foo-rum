import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/", { state: { authModal: "login" } });
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default SignIn;
