// QuestGame.js
import React, { useState, useEffect } from 'react';
import Task from './Task';
import piratBild from './img/pirat.png'; 

const QuestGame = () => {
  const [currentTask, setCurrentTask] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [queryTableData, setQueryTableData] = useState([]);
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    };

    if (tasks.length === 0) {
      fetchData();
    }
  }, [tasks])

  const handleQuerySubmit = async (query) => {
    if (
      tasks[currentTask - 1].expectedQuery
        .replace(/\s/g, "")
        .replace(/['`]/g, '"')
        .toLowerCase() ===
      query.replace(/\s/g, "").replace(/['`]/g, '"').toLowerCase()
    ) {
      setCurrentTask(currentTask + 1);
      setErrorMessage("");
      setSucessMessage(tasks[currentTask - 1].success);

      try {
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        };
    
        const response = await fetch('http://localhost:3001/api/query', requestOptions);
        const data = await response.json();
        setQueryTableData(data);
      } catch (error) {
        console.error('Error fetching crew data:', error);
      }
    } else {
      setErrorMessage(tasks[currentTask - 1].error);
    }
  };
  

  return (
    <div>
      {errorMessage && (
        <div className="error-container">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="success-container">
          {successMessage}
        </div>
      )}
      {queryTableData && queryTableData.length > 0 && (
        <div className="success-container">
          <div className="mongo-table">
            <div className="mongo-row mongo-header">
              {Object.keys(queryTableData[0]).map((key) => (
                <div className="mongo-cell" key={key}>
                  {key}
                </div>
              ))}
            </div>
            {queryTableData.map((row, index) => (
              <div className="mongo-row" key={index}>
                {Object.values(row).map((value, index) => (
                  <div className="mongo-cell" key={index}>
                    {value}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="background-container">
        <img className='pirat-container' src={piratBild} alt="Piratenbild" />
        <div className="quest-game-container">
          <h1>MongoDB-Island</h1>
          {currentTask <= tasks.length ? (
            <Task
              key={tasks[currentTask - 1].id}
              task={tasks[currentTask - 1]}
              onQuerySubmit={handleQuerySubmit}
            />
          ) : (
            <p>Glückwunsch, du hast alle Aufgaben gelöst!</p>
          )}
        </div>
    </div>
    </div>
  
  );
};

export default QuestGame;
