const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3001;

app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log('Connected to MongoDB');

client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');
  }
});

app.get('/api/crew', async (req, res) => {
  try {
    const db = client.db('test');
    const crewData = await db.collection('crew').find({}).toArray();
    res.json(crewData);
  } catch (error) {
    console.error('Error fetching crew data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    console.log(1)
    const db = client.db('test');
    const tasksData = await db.collection('tasks').find({}).toArray();
    res.json(tasksData);
  } catch (error) {
    console.error('Error fetching tasks data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
