import { LoginIcon, MouseIcon } from "../../assets/icons";

interface NavbarProps {
  onLoginClick: () => void;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <nav className="flex justify-between px-6 sm:px-12 py-6 border-b border-gray-100">
      {/* Logo Section */}
      <div className="flex items-center gap-x-1.5">
        <MouseIcon />

        <h2 className="text-sm font-bold">foo-rum</h2>
      </div>

      {/* Login Button */}
      <button
        className="flex items-center gap-x-1 cursor-pointer"
        onClick={onLoginClick}
      >
        <h2 className="text-sm font-bold">Login</h2>
        <LoginIcon />
      </button>
    </nav>
  );
}
