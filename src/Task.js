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

    const lastDotIndex = query.lastIndexOf(".");
    const newQuery = query.slice(0, lastDotIndex + 1) + suggestion;
    setQuery(newQuery);
    setSuggestions([]);
  };

  const getMatchingSuggestions = (input) => {
        // let staticSuggestions = ['db.'];

    // if (input.includes("db.")) {
    //   console.log(input);
    //   staticSuggestions = ['crew.', 'items.', 'stash'];

    // }
    //   return staticSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(input.toLowerCase())
    // );
    let staticSuggestions = ['db.','crew.', 'items.', 'stash.' ,'find({})', 'aggregate({})'];

    return staticSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(input.toLowerCase())
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