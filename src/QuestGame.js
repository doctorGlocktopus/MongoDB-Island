// QuestGame.js
import React, { useState } from 'react';
import Task from './Task';

const QuestGame = () => {
  const [currentTask, setCurrentTask] = useState(1);

  const tasks = [
    {
      id: 1,
      question: 'Wir sind gestrandet, wir sollten die anderen Mitglieder der Crew suchen.',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.crew.find({})',
    },
    {
      id: 2,
      question: 'Ohje ich bin noch neu auf dem Schiff und weiß nicht wer den Beruf Capitän hat',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.crew.find({Beruf: "Capitän"})',
    },
    {
      id: 3,
      question: 'Gut das du mich aus den Trümmern finden konntest, hust hust. Trommle alle Leute zusammen die unter 42 Jahre alt sind. Wir müssen die Insel erkunden',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.products.find({ age: { $lt: 42 } })',
    },
    {
      id: 4,
      question: 'Aber Capitän das schließt sie aber aus, dass finde ich etwas unfair',
      tipp: 'db.crew.find({})',
      expectedQuery: 'db.products.find({$or: [{ age: { $lt: 42 } },{ Beruf: "Capitän" }]})',
    },
    {
      id: 5,
      question: 'Nagut ok ich komme mit wenn du mein älteres Exemplar meines Buch "Naturkunde für Dummis" findest',
      tipp: 'db.books.find({}).sort({}).limit(1)',
      expectedQuery: 'db.books.find({ Titel: "Naturkunde für Dummis" }).sort({ Erstellungsdatum: 1 }).limit(1)',
    },
    {
      id: 6,
      question: 'Füge das Buch nun deinem Inventar zu.',
      tipp: 'db.books.insertOne({name: db.books.find({...).sort(...).limit(1).next().Titel});',
      expectedQuery: 'db.stash.insertOne({name: db.books.find({ Titel: "Naturkunde für Dummies" }).sort({ Erstellungsdatum: 1 }).limit(1).next().Titel});',
    },
    {
      id: 7,
      question: 'Aktualisiere den Preis aller Elektronikprodukte um 10%.',
      expectedQuery: 'db.products.updateMany({ category: "Elektronik" }, { $mul: { price: 1.1 } })',
    },
    {
      id: 8,
      question: 'Lösche alle Bestellungen vor dem 1. Januar 2023.',
      expectedQuery: 'db.orders.deleteMany({ order_date: { $lt: ISODate("2023-01-01") } })',
    },
    {
      id: 9,
      question: 'Berechne den Durchschnittspreis aller Produkte.',
      expectedQuery: 'db.products.aggregate([{ $group: { _id: null, averagePrice: { $avg: "$price" } } }])',
    },
    {
      id: 10,
      question: 'Erstelle einen Index für das Feld "Datum" in der Sammlung "Protokolle".',
      expectedQuery: 'db.logs.createIndex({ date: 1 })',
    },
  ];

  const handleQuerySubmit = (query) => {
    if(tasks[currentTask -1 ].expectedQuery.replace(/\s/g, "") === query.replace(/\s/g, "")) {

        setCurrentTask(currentTask + 1);
    }
  };

  return (
    <div className="background-container">
        <div className="overlay"></div>
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
  );
};

export default QuestGame;
