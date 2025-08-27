import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import './db/index.js';
import mongoose from 'mongoose';
import { errorHandler } from './middlewares/index.js';
import Book from './models/Book.js';

const app = express();
const port = process.env.PORT || 8912;

app.use(express.json());
app.use(cors());

app.get('/health', async (_req, res) => {
  const { ok } = await mongoose.connection.db.admin().ping();
  if (!ok) throw new Error('DB is unconnected', { cause: 503 });
  res.json({ msg: 'Running' });
});

app.get('/books/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) throw new Error('Book not found', { cause: 404 });
  res.json({ data: book });
});

app.use('/{*splat}', (req, _res) => {
  throw new Error(`URL unavailable; you used ${req.originalUrl}`, { cause: 404 });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(chalk.bgGreen(` Personal Library API listening on port ${port} `));
});
