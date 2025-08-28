import React, { useState } from "react";

export default function Task({ task, onDelete, onStatusChange }) {
  const [status, setStatus] = useState(task.status);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    if (onStatusChange) onStatusChange(task._id, newStatus);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(task._id);
  };

  return (
    <div className="flex items-center justify-between p-3 mb-2 border border-gray-300 rounded-md">
      <span className="font-medium">{task.title}</span>

      <select
        value={status}
        onChange={handleStatusChange}
        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="ToDo">ToDo</option>
        <option value="InProgress">InProgress</option>
        <option value="Done">Done</option>
      </select>

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
      >
        X
      </button>
    </div>
  );
}
