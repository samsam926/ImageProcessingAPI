import express from 'express';
import route from './routes/api';

const app = express();
const port = 5000;

// Middleware
const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let url = req.url;
  console.log(`${url} was visited`);
  next();
};

// routes
app.use('/api', logger, route);

//set endpoint
app.get('/', (req, res) => {
  res.send('Hello, World.');
});

// check port to avoid already using
app.listen(port, () => console.log('Listening on' + port));

export default app;
