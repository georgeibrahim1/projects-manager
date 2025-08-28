import React, { useEffect, useState } from "react";
import ProjectCard from "../ui/projectCard";
import Button from "../ui/button";
import Form from "../ui/form";
import { useNavigate } from "react-router-dom";

export default function ProjectList() {

  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [IsOpenAddForm,setIsOpenAddForm] = useState(false);
  const [error,setError] = useState({status: false , message:""});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`, // for the authMiddleware
          },
        });

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        setProjects(data.data || []);
      } catch (err) {
        setError({status: true,message:err.message});
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // for the authMiddleware
        },
      });

      if (!res.ok) throw new Error("Failed to delete project");

      setProjects(projects.filter((project) => project._id !== id));
    } catch (err) {
      setError({status: true,message:err.message});
    }
  };

  const handleAddProject = async (formData) => {

    if (!formData.title || !formData.description) {
      setError({ status: true, message: "All fields are required!" });
      return;
    }

    const newProject = {
      title: formData.title,
      description: formData.description,
    };

    try {
      const res = await fetch("http://localhost:3000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // for the authMiddleware
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) throw new Error("Failed to add project");

      const created = await res.json();
      setProjects([...projects, created.data]);
    } catch (err) {
      setError({status: true,message:err.message});
    }
  };

  const handleShowTasks = (project)=> {
    navigate(`/project/${project._id}`);
  };

  if (loading) {
    return <div className="p-6">Loading projects...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Projects</h1>
      <div className="flex justify-center mb-6">
        <div className="w-48">
          <Button onClick={()=>{setIsOpenAddForm(true)}} variant="baseV">
            + Add Project
          </Button>
          {IsOpenAddForm && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
                  <button
                    onClick={() => setIsOpenAddForm(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>

                  <h2 className="text-xl font-semibold mb-4 text-center">Add New Project</h2>

                  <Form
                    fields={[
                      {
                        id: "title",
                        isLabel: true,
                        labelText: "Title",
                        placeholder: "Enter project title",
                      },
                      {
                        id: "description",
                        isLabel: true,
                        labelText: "Description",
                        placeholder: "Enter project description",
                      }
                    ]}
                    onSubmit={handleAddProject}
                    buttonText="+ Add Project"
                    error={error.status ? error.message : null}
                  />
                </div>
              </div>
            </>
          )}
      </div>
    </div>

      {projects.length === 0 ? (
        <p className="text-center">No projects found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              title={project.title}
              description={project.description}
              date={new Date(project.createdAt).toLocaleDateString()}
              onDelete={() => handleDelete(project._id)}
              onShowTasks={() => handleShowTasks(project)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
