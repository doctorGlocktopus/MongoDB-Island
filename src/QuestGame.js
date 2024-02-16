// QuestGame.js
import React, { useState, useEffect } from 'react';
import Task from './Task';
import piratBild from './img/pirat.png';

const QuestGame = () => {
  const [currentTask, setCurrentTask] = useState(2);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSucessMessage] = useState("");
  const [queryTableData, setQueryTableData] = useState([]);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      question: 'Wir sind gestrandet, wir sollten die anderen Mitglieder der Crew suchen.',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.crew.find({})',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 2,
      question: 'Ohje ich bin noch neu auf dem Schiff und weiß nicht wer den Beruf Capitän hat',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.crew.find({Beruf: "Capitän"})',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 3,
      question: 'Gut das du mich aus den Trümmern finden konntest, hust hust. Trommle alle Leute zusammen die unter 42 Jahre alt sind. Wir müssen die Insel erkunden',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.items.find({ age: { $lt: 42 } })',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 4,
      question: 'Aber Capitän das schließt sie aber aus, dass finde ich etwas unfair',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.items.find({$or: [{ age: { $lt: 42 } },{ Beruf: "Capitän" }]})',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 5,
      question: 'Nagut ok ich komme mit wenn du mein älteres Exemplar meines Buch "Naturkunde für Dummis" findest',
      tipp: 'db.books.find({}).sort({}).limit(1)',
      expectedQuery: 'db.books.find({ Titel: "Naturkunde für Dummis", Bestitzer: "Capitän" }).sort({ Erstellungsdatum: 1 }).limit(1)',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 6,
      question: 'Füge das Buch nun deinem Inventar zu.',
      tipp: 'db.books.insertOne({name: db.books.find({...).sort(...).limit(1).next().Titel});',
      expectedQuery: 'db.stash.insertOne({name: db.books.find({ Titel: "Naturkunde für Dummies", Bestitzer: "Capitän" }).sort({ Erstellungsdatum: 1 }).limit(1).next().Titel});',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 7,
      question: 'Die verbleibenden auf dem Schiff sollen eine Party feiern. Wie viel Alohol haben wir noch an bord?',
      tipp: 'db.items.find({ category: "Alkohol" })',
      expectedQuery: 'db.items.find({ category: "Alkohol" })',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 8,
      question: 'Oh, dann sind ein paar abgelaufene Sachen dabei, schmeiße alle Flasche mit einem Verfalldatum nach dem 1. Januar 2024 weg.',
      tipp: 'db.items.deleteMany({ creation_date: { $lt: ISODate("2024-01-01") } })',
      expectedQuery: 'db.items.deleteMany({ creation_date: { $lt: ISODate("2024-01-01") } })',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 9,
      question: 'Verringere in der Zwischenzeit die Preis für Alkohol um 10%, nur um eine Meuterrei verzubeugen.',
      tipp: 'db.items.updateMany({ category: "Alkohol" }, { $mul: { price: 1.1 } })',
      expectedQuery: 'db.items.updateMany({ category: "Alkohol" }, { $mul: { price: 1.1 } })',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 10,
      question: 'Was für Gegenstände haben wir auf dem Schiff?',
      tipp: 'db.items.find({})',
      expectedQuery: 'db.items.find({})',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 11,
      question: 'Dass sind aber viele, kannst du mir nur die Waffen zeigen?',
      tipp: 'db.items.find({ usage: "Waffe" })',
      expectedQuery: 'db.items.find({ usage: "Waffe" })',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 13,
      question: 'Berechne den Durchschnittspreis aller Produkte.',
      tipp: 'db.items.aggregate([{ $group: { _id: null, averagePrice: { $avg: "$price" } } }])',
      expectedQuery: 'db.items.aggregate([{ $group: { _id: null, averagePrice: { $avg: "$price" } } }])',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
    {
      id: 14,
      question: 'Erstelle einen Index für das Feld "Datum" in der Sammlung "Protokolle".',
      tipp: 'db.logs.createIndex({ date: 1 })',
      expectedQuery: 'db.logs.createIndex({ date: 1 })',
      error: "das war flasch",
      success: "du hast es geschafft!"
    },
  ])


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
    const fomattedQuerry = query.replace(/\s/g, "").replace(/['`"]/g, "'")
    const formattedExpectedQuery = tasks[currentTask - 1].expectedQuery.replace(/\s/g, "").replace(/['`"]/g, "'")
    if ( formattedExpectedQuery === fomattedQuerry
    ) {
      setCurrentTask(currentTask + 1);
      setErrorMessage("");
      setSucessMessage(tasks[currentTask - 1].success);

      try {
        console.log(formattedExpectedQuery)
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
