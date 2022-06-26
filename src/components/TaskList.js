import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import "./TaskList.scss";

const TaskList = ({
  tasks,
  deleteTask,
  completeTask,
  editTask,
  handleDragEnd,
  filterActive,
  filterCompleted,
  filterAll,
  clearCompleted,
  tasksLeft,
}) => {
  const [active, setActive] = useState("all");

  const handleClick = (filter) => {
    setActive(filter);
  };
  return (
    <div className={tasks.length > 0 ? "wrap-task-list" : "hide"}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={task.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        task={task}
                        deleteTask={deleteTask}
                        completeTask={completeTask}
                        editTask={editTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="filter-buttons">
        <p>{tasksLeft} tasks left</p>
        <button
          className={active === "all" ? "active" : ""}
          onClick={() => {
            filterAll();
            handleClick("all");
          }}
        >
          All
        </button>
        <button
          className={active === "active" ? "active" : ""}
          onClick={() => {
            filterActive();
            handleClick("active");
          }}
        >
          Active
        </button>
        <button
          className={active === "completed" ? "active" : ""}
          onClick={() => {
            filterCompleted();
            handleClick("completed");
          }}
        >
          Completed
        </button>
        <button onClick={clearCompleted}>Clear completed</button>
      </div>
    </div>
  );
};

export default TaskList;
