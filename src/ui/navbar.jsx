import Logo from "../ui/logo";

export default function NavBar({ children }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
      <div>
        <Logo />
      </div>
      <div className="flex gap-4">
        {children}
      </div>
    </div>
  );
}