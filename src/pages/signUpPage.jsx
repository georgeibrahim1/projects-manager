import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../ui/logo";
import Form from "../ui/form";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({ status: false, message: "" });

  const handleSubmit = (data) => {
    if (!data.username || !data.password) {
      setError({ status: true, message: "All fields are required!" });
      return;
    }

    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-6">
        <Logo />
      </div>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Form
          fields={[
            {
              id: "username",
              type: "text",
              isLabel: true,
              labelText: "User Name",
              placeholder: "Enter your name",
            },
            {
              id: "password",
              type: "password",
              isLabel: true,
              labelText: "Password",
              placeholder: "Enter your password",
            },
          ]}
          buttonText="Sign Up"
          onSubmit={handleSubmit}
          error={error.status ? error.message : null}
        />
      </div>
    </div>
  );
}

