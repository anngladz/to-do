import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './AddTask.scss';

const AddTask = ({ addTask }) => {
  const [id, setId] = useState(uuidv4());
  const [text, setText] = useState();
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      alert('Please add a task!');
      return;
    }

    addTask({ id, text, completed });

    setId(uuidv4());
    setText('');
    setCompleted(false);
  };

  return (
    <form className='wrap-add-task' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Task name...'
        onChange={(e) => setText(e.target.value)}
        value={text || ''}
      />
      <button type='submit'>Add</button>
    </form>
  );
};

export default AddTask;
