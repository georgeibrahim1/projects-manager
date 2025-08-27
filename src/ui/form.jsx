import Input from "../ui/input";
import Button from "../ui/button";
import { useState } from "react";

export default function Form({ fields, onSubmit, buttonText , error}) {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.id] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {fields.map((field) => (
        <Input
          key={field.id}
          id={field.id}
          type={field.type}
          value={formData[field.id] || ""}
          onChange={handleChange}
          placeholder={field.placeholder}
          isLabel={field.isLabel}
          labelText={field.labelText}
        />
      ))}

      {error && (
        <p className="text-red-500 mb-2 text-sm">
          {typeof error === "string" ? error : error.message}
        </p>
      )}

      <Button type="submit" variant="form">
        {buttonText}
      </Button>
    </form>
  );
}
