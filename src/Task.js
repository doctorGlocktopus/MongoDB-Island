// Task.js
import React, { useState } from 'react';

const Task = ({ task, onQuerySubmit }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const userInput = e.target.value;
  
    if (userInput.includes(".")) {
      const lastDotIndex = userInput.lastIndexOf(".");
      const searchQuery = userInput.slice(lastDotIndex + 1);
      setQuery(userInput);
      setSuggestions(getMatchingSuggestions(searchQuery));
    } else {
      setQuery(userInput);
  
      const matchingSuggestions = getMatchingSuggestions(userInput);
      setSuggestions(matchingSuggestions);
    }
  };
  

  const handleSuggestionClick = (suggestion) => {
    setQuery(prevQuery => prevQuery + suggestion + ' ');
    setSuggestions([]);
  };

  const getMatchingSuggestions = (input) => {
    const staticSuggestions = ['find({})', 'insert', 'update', 'delete', 'db.', 'aggregate({})', '$lt', '$gt'];
    return staticSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(input.toLowerCase())
    );
  };

  return (
    <div>
      <h2>Aufgabe {task.id}</h2>
      <p>{task.question}</p>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={task.tipp}
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => onQuerySubmit(query)}>Einreichen</button>
    </div>
  );
};

export default Task;
