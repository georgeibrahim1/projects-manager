import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../ui/logo";
import Form from "../ui/form";

export default function LogInPage({}) {
  const navigate = useNavigate();
  const [error, setError] = useState({ status: false, message: "" });

  const handleSubmit = async (formData) => {
    if (!formData.name || !formData.password) {
      setError({ status: true, message: "All fields are required!" });
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) localStorage.setItem("token", data.token); 
        navigate("/projects");
      } else {
        setError({ status: true, message: data.message || "Login failed" });
      }
    } catch (err) {
      setError({ status: true, message: "Server error" });
    }
  };

  return (
    <div className="flex h-[30rem] flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Form
          fields={[
            {
              id: "name",
              type: "text",
              isLabel: true,
              labelText: "Name",
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
          buttonText="Log In"
          onSubmit={handleSubmit}
          error={error.status ? error.message : null}
        />
      </div>
    </div>
  );
}
