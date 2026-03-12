import "./App.css";
import Todo from "./components/Todo";
import TodoList from "./components/TodoList";
import TodoInProgress from "./components/TodoInProgress";
import TodoDone from "./components/TodoDone";
import { useState } from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function App() {
  const [tasks, setTasks] = useState([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const addTask = (task) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), task: task.task, status: "todo" },
    ]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const nextTask = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: status } : task)),
    );
  };

  const prevTask = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: status } : task)),
    );
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setTasks((prev) => {
      const activeIndex = prev.findIndex((t) => t.id === activeId);
      const overIndex = prev.findIndex((t) => t.id === overId);

      const activeTask = prev[activeIndex];
      const overTask = overIndex !== -1 ? prev[overIndex] : null;
      if (["todo", "in-progress", "completed"].includes(overId)) {
        if (activeTask.status !== overId) {
          const newTasks = [...prev];
          newTasks[activeIndex] = { ...activeTask, status: overId };
          return newTasks;
        }
        return prev;
      }
      if (overTask && activeTask.status !== overTask.status) {
        const newTasks = [...prev];
        newTasks[activeIndex] = { ...activeTask, status: overTask.status };
        return arrayMove(newTasks, activeIndex, overIndex);
      }
      if (overTask && activeTask.status === overTask.status) {
        return arrayMove(prev, activeIndex, overIndex);
      }
      return prev;
    });
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-center px-2 py-1">
        <Todo initialTask={addTask} />
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4 ">
        <TodoList
          tasks={tasks.filter((t) => t.status === "todo")}
          deleteTask={deleteTask}
          nextTask={nextTask}
        />
        <TodoInProgress
          tasks={tasks.filter((t) => t.status === "in-progress")}
          nextTask={nextTask}
          prevTask={prevTask}
          deleteTask={deleteTask}
        />
        <TodoDone
          tasks={tasks.filter((t) => t.status === "completed")}
          deleteTask={deleteTask}
          prevTask={prevTask}
        />
      </div>
    </DndContext>
  );
}

export default App;
