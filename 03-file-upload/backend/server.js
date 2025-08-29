import cors from 'cors';
import chalk from 'chalk';
import express from 'express';
import upload from './middlewares/upload.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.static('uploads'));

app.get('/', (_req, res) => {
  res.send('Running');
});

app.post('/file-upload', upload.single('image'), (req, res) => {
  // const location = `${req.protocol}://${req.host}/${req.file.filename}`;

  const location = req.file.secure_url;

  res.json({ message: 'File upload', location });
});

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.cause || 500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(chalk.bgGreen(` File Upload Server listening on port ${port} `));
});
