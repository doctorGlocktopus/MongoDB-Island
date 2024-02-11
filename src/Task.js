// Task.js
import React, { useState } from 'react';

const Task = ({ task, onQuerySubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = () => {
    onQuerySubmit(query);
    setQuery('');
  };

  return (
    <div>
      <h2>Aufgabe {task.id}</h2>
      <p>{task.question}</p>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={task.tipp}
      />
      <button onClick={handleSubmit}>Einreichen</button>
    </div>
  );
};

export default Task;
