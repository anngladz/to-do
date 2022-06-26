import AddTask from "./AddTask";
import "./Header.scss";

const Header = ({ addTask }) => {
  return (
    <div className="wrap-header">
      <h1>To do</h1>
      <AddTask addTask={addTask} />
    </div>
  );
};

export default Header;
