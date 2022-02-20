import express from 'express';
import images from './childs/images';
const route = express.Router();

route.get('/', (req: express.Request, res: express.Response) => {
  res.send('it is api');
});

route.use('/images', images);

export default route;
