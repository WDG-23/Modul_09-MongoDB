import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';
import User from './models/User.js';
import Post from './models/Post.js';

await mongoose.connect(process.env.MONGO_URI, { dbName: 'sample_mflix' });

const Movie = mongoose.model(
  'movie',
  new mongoose.Schema({
    title: String,
  })
);

const app = express();
const port = 3000;

app.use(express.json(), cors());

app.get('/movies', async (req, res) => {
  const movies = await Movie.find();
  res.json({ data: movies });
});

app.get('/movies/:id', async (req, res) => {
  const { id } = req.params;
  // const movie = await Movie.findOne({ _id: req.params.id });
  const movie = await Movie.findById(id);
  res.json({ data: movie });
});

app.post('/movies', async (req, res) => {
  const { title } = req.body;
  const movie = await Movie.create({ title });
  res.json({ data: movie });
});

app.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  // const movie = await Movie.updateOne({ _id: id }, { $set: { title } })
  const movie = await Movie.findByIdAndUpdate(id, { title }, { new: true });

  res.json({ data: movie });
});

app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;

  // const movie = await Movie.findOneAndDelete({ _id: id });
  const movie = await Movie.findByIdAndDelete(id);

  res.json({ data: movie });
});

// Create User
app.post('/users', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const user = await User.create({ firstName, lastName, email });
  res.status(201).json({ data: user });
});

// Create Post
app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  const post = await Post.create({ title, content, author });
  res.status(201).json({ data: post });
});

// Get One Post
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).select('title').populate('author', '-email');

  res.json({ data: post });
});

app.listen(port, () => {
  console.log(` Server läuft auf port ${port} `);
});
