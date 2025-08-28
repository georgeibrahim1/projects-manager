import Button from "./button";

export default function ProjectCard({ title, description, date, onDelete, onShowTasks }) {
  return (
    <div className="relative w-full max-w-md p-4 rounded-2xl shadow-md border bg-white">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
      >
        X
      </button>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <p className="text-xs text-gray-400 mb-4">📅 {date}</p>
      <Button onClick={onShowTasks} variant="baseV">
        Show Tasks
      </Button>
    </div>
  );
}
