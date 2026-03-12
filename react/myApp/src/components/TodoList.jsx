import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

const TodoList = ({ tasks, deleteTask, nextTask }) => {
  const { setNodeRef } = useDroppable({
    id: "todo",
  });

  return (
    <div
      ref={setNodeRef}
      className="border border-gray-300 min-h-100 rounded-md px-2 py-1"
    >
      <div className="text-center font-semibold text-2xl">Todo List</div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul className="">
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id}>
              <li className="flex justify-between mt-2 p-2 bg-white border border-gray-200 rounded shadow-sm cursor-move">
                <span>{task.task}</span>
                <span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(task.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-red-500 mx-2 text-white px-2 py-1 rounded-md cursor-pointer"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextTask(task.id, "in-progress");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-green-500 text-white px-2 py-1 rounded-md cursor-pointer"
                  >
                    next
                  </button>
                </span>
              </li>
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};
export default TodoList;
