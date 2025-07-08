import { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LoginIcon } from "../assets/icons";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  switchMode: (mode: "login" | "signup") => void;
}

export default function AuthModal({
  mode: initialMode,
  onClose,
  switchMode,
}: AuthModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"login" | "signup">(initialMode); // internal state

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // Close if click is outside modal
    }
  };
  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/30 bg-opacity-40 flex justify-center items-center z-50"
    >
      <div
        ref={modalRef}
        className="bg-[#ebebeb] p-2 pb-4 rounded-[30px] shadow-lg relative max-w-[360px] sm:min-w-[480px]"
      >
        <div className="bg-white rounded-3xl px-6 py-6">
          {/* <button
            className="absolute top-2 right-2 text-gray-500 text-xl"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button> */}

          {mode === "login" ? (
            <LoginForm onSuccess={onClose} switchMode={switchMode} />
          ) : (
            <SignUpForm onSuccess={onClose} switchMode={switchMode} />
          )}
        </div>

        <p className="mt-4 text-center text-sm text-black/60 font-medium">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-[#5057ea] cursor-pointer"
          >
            {mode === "login" ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}

function LoginForm({
  onSuccess,
}: {
  switchMode: (mode: "login" | "signup") => void;
  onSuccess: () => void;
}) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) {
      alert("Invalid credentials");
    } else {
      alert("Login successful");
      onSuccess(); // Close modal
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-[#f8f8f8] pl-2 pr-2.5 py-2 rounded-full inline-block my-4">
        <LoginIcon />
      </div>
      <div className="mb-8 flex flex-col justify-center items-center">
        <h2 className="text-xl text-black font-bold">Sign in to continue</h2>
        <p className="text-sm text-black/50 text-center">
          Sign in to access all the features on this app
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Email or Username</label>
          <input
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-2 rounded bg-[#f4f4f4] text-sm px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mt-2 rounded bg-[#f4f4f4] text-sm px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 mb-8 bg-[#5057ea] text-white text-sm py-2 rounded-lg cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

function SignUpForm({
  onSuccess,
}: {
  switchMode: (mode: "login" | "signup") => void;
  onSuccess: () => void;
}) {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = signup(email, password);
    if (!success) {
      alert("Account already exists");
    } else {
      alert("Signup successful");
      onSuccess(); // Close modal
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-[#f8f8f8] pl-2 pr-2.5 py-2 rounded-full inline-block my-4">
        <LoginIcon />
      </div>
      <div className="mb-8 flex flex-col justify-center items-center">
        <h2 className="text-xl text-black font-bold">
          Create an account to continue
        </h2>
        <p className="text-sm text-black/50 text-center">
          Create an account to access all the features on this app
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-semibold">Email or Username</label>
          <input
            type="email"
            placeholder="Enter your email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mt-2 rounded bg-[#f4f4f4] text-sm px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mt-2 rounded bg-[#f4f4f4] text-sm px-4 py-2"
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Repeat Password</label>
          <input
            type="password"
            placeholder="Enter your password again"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            required
            className="w-full p-2 mt-2 rounded bg-[#f4f4f4] text-sm px-4 py-2"
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 mb-8 bg-[#5057ea] text-white text-sm py-2 rounded-lg cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
