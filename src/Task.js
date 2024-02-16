import React, {useState} from 'react';

const Task = ({task, onQuerySubmit}) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = (e) => {
        const userInput = e.target.value;

        if (userInput.includes(".")) {
            setQuery(userInput);
            setSuggestions(getMatchingSuggestions(userInput));
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
        let staticSuggestions = ['db.'];
    
        if (input.includes("db.")) {
            staticSuggestions = ['crew.', 'items.', 'stash.', 'logs.'];
            if (input.includes('crew.') || input.includes('items.') || input.includes('stash.') || input.includes('logs.')) {
                staticSuggestions = ['find({})', 'aggregate({})'];
            }
        }
    
        const lastDotIndex = input.lastIndexOf(".");
        const lastWord = input.slice(lastDotIndex + 1);
    
        return staticSuggestions.filter((suggestion) => suggestion.toLowerCase().includes(lastWord.toLowerCase()));
    };
    

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            if (suggestions.length > 0) {
                // Wenn es Suggestions gibt, wähle die erste Suggestion aus
                const closestSuggestion = suggestions[0];
                const lastDotIndex = query.lastIndexOf(".");
                setQuery((prevQuery) => prevQuery.slice(0, lastDotIndex + 1) + closestSuggestion);
                setSuggestions([]); // Schließe die Dropdown-Liste
            }
            onQuerySubmit(query); // Rufe onQuerySubmit mit dem aktualisierten Query-Wert auf
        }
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
                onKeyDown={handleKeyPress}
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