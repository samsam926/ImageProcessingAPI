import express from 'express';
const images = express.Router();

images.get('/', (req, res) => {
  res.send('it is images');
});

export default images;
