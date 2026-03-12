import { useState } from "react";

const Todo = ({ initialTask }) => {
  const [tasks, setTasks] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTasks((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tasks.task.trim() === "") return;
    initialTask(tasks);
    setTasks({ task: "" });
  };
  return (
    <div className="flex justify-center">
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={tasks.task}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
        <button
          type="submit"
          className="bg-blue-500 mx-2 text-white px-2 py-1 rounded-md"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};
export default Todo;
