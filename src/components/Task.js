import { useState } from "react";
import "./Task.scss";

const Task = ({ task, deleteTask, completeTask, editTask }) => {
  const [taskEditing, setTaskEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  return (
    <div key={task.id} className="wrap-task">
      <input
        type="checkbox"
        id="completed"
        checked={task.completed}
        onChange={() => completeTask(task.id)}
      />
      <span className="checkmark"></span>
      {task.id === taskEditing ? (
        <input
          className="edit"
          type="text"
          onChange={(e) => setEditingText(e.target.value)}
        />
      ) : (
        <p className={task.completed ? "completed" : ""}>{task.text}</p>
      )}

      {task.id === taskEditing ? (
        <div>
          <button
            onClick={() => {
              editTask(task.id, editingText);
              setTaskEditing(null);
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <button
            className={task.completed ? "hide" : ""}
            onClick={() => setTaskEditing(task.id)}
          >
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)}>X</button>
        </div>
      )}
    </div>
  );
};

export default Task;
