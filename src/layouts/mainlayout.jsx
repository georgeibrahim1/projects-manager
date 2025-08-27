import React from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../ui/navbar";

export default function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar>
        {!isLoggedIn ? (
          <>
            {location.pathname !== "/login" && (
              <Link to="/login" className="hover:underline px-2">
                Log in
              </Link>
            )}
            {location.pathname !== "/signup" && (
              <Link to="/signup" className="hover:underline px-2">
                Sign up
              </Link>
            )}
          </>
        ) : (
          <button
            onClick={handleSignOut}
            className="hover:underline bg-red-500 px-3 py-1 rounded"
          >
            Sign out
          </button>
        )}
      </NavBar>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
