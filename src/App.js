import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import './App.scss';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });
  const [filterTasks, setfilterTasks] = useState(tasks);
  const [filter, setfilter] = useState('');
  const [tasksLeft, setTaskLeft] = useState(
    tasks.filter((task) => !task.completed).length
  );

  const filterAll = useCallback(() => {
    setfilterTasks(tasks);
    setfilter('');
  }, [tasks]);

  const filterActive = useCallback(() => {
    setfilterTasks(tasks.filter((task) => !task.completed));
    setfilter('active');
  }, [tasks]);

  const filterCompleted = useCallback(() => {
    setfilterTasks(tasks.filter((task) => task.completed));
    setfilter('completed');
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setTaskLeft(tasks.filter((task) => !task.completed).length);
    if (filter === 'active') {
      filterActive();
    } else if (filter === 'completed') {
      filterCompleted();
    } else {
      filterAll();
    }
  }, [tasks, filter, filterAll, filterActive, filterCompleted]);

  const addTask = (task) => setTasks([...tasks, task]);

  const deleteTask = (id) => {
    let updatedTasks = [...tasks].filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const completeTask = (id) => {
    let updatedTasks = [...tasks].map((task) => {
      if (task.id === id) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const editTask = (id, editedText) => {
    if (!editedText) {
      alert('Write something!');
    } else {
      const updatedTasks = [...tasks].map((task) => {
        if (task.id === id) {
          task.text = editedText;
        }
        return task;
      });
      setTasks(updatedTasks);
    }
  };

  const clearCompleted = () => {
    const newTasks = tasks.filter((task) => !task.completed);
    setTasks(newTasks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = [...new Set([...filterTasks, ...tasks])];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTasks(items);
  };

  return (
    <>
      <Header addTask={addTask} />
      <TaskList
        tasks={filterTasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
        editTask={editTask}
        handleDragEnd={handleDragEnd}
        filterAll={filterAll}
        filterActive={filterActive}
        filterCompleted={filterCompleted}
        clearCompleted={clearCompleted}
        tasksLeft={tasksLeft}
      />
    </>
  );
};

export default App;
