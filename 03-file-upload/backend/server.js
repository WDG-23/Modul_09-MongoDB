import cors from 'cors';
import chalk from 'chalk';
import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/', (_req, res) => {
  res.send('Running');
});

app.post('/file-upload', (req, res) => {
  res.json({ message: 'File upload' });
});

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.cause || 500).json({ error: err.message });
});

app.listen(port, () => {
  console.log(chalk.bgGreen(` File Upload Server listening on port ${port} `));
});
