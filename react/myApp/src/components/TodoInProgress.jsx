import {
  verticalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { useDroppable } from "@dnd-kit/core";

const TodoInProgress = ({ tasks, nextTask, prevTask, deleteTask }) => {
  const { setNodeRef } = useDroppable({
    id: "in-progress",
  });

  return (
    <div
      ref={setNodeRef}
      className="border border-gray-300 min-h-100 rounded-md px-2 py-1"
    >
      <div className="flex justify-center">
        <h2 className="text-center font-semibold text-2xl">Todo In Progress</h2>
      </div>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <ul>
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id}>
              <li className="flex justify-between mt-2 p-2 bg-white border border-gray-200 rounded shadow-sm cursor-move">
                <span>{task.task}</span>
                <span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevTask(task.id, "todo");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-green-500 text-white px-2 py-1 mx-2 rounded-md cursor-pointer"
                  >
                    Previous
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextTask(task.id, "completed");
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    className="bg-green-500 text-white px-2 py-1 rounded-md cursor-pointer"
                  >
                    Next
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
export default TodoInProgress;
