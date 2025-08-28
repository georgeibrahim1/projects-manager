import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../ui/button";
import Form from "../ui/form";
import TaskCard from "../ui/taskCard";

export default function TasksPage() {
  const { id: projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenAddForm, setIsOpenAddForm] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/projects/${projectId}/tasks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setTasks(data?.data?.tasks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) fetchTasks();
  }, [projectId]);

  const handleAddTask = async (formData) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, projectId }),
      });
      const data = await res.json();

      if (res.ok) {
        setTasks((prev) => [...prev, data.data.task]);
        setIsOpenAddForm(false);
        setError({ status: false, message: "" });
      } else {
        setError({ status: true, message: data.message });
      }
    } catch (err) {
      setError({ status: true, message: err.message });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Tasks for Project {projectId}</h1>

      <Button onClick={() => setIsOpenAddForm(true)} variant="baseV">
        + Add Task
      </Button>

      {isOpenAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpenAddForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">Add New Task</h2>

            <Form
              fields={[
                {
                  id: "title",
                  isLabel: true,
                  labelText: "Title",
                  placeholder: "Enter task title",
                },
                {
                  id: "status",
                  isLabel: true,
                  labelText: "Status",
                  placeholder: "Enter task status",
                },
              ]}
              onSubmit={handleAddTask}
              buttonText="+ Add Task"
              error={error.status ? error.message : null}
            />
          </div>
        </div>
      )}

      {tasks.length > 0 ? (
        <div className="mt-4 space-y-2">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No tasks found for this project.</p>
      )}
    </div>
  );
}
