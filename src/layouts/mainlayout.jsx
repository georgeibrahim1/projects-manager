import React, { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import NavBar from "../ui/navbar";

export default function MainLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    setIsLoggedIn(false);
    // clear token/localStorage if needed
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar>
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="hover:underline px-2"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="hover:underline px-2"
            >
              Sign up
            </Link>
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