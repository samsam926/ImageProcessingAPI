import express from 'express';
import { ImagesRequest } from '../../../types/image';
import convertImage from '../../../utilites/imageProcessing';

// constants
const images = express.Router();
const path = require('path');

// Convert Image Middleware
const convertImagesReq = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void | boolean> => {
  const { width, height, imagename } = req.query as unknown as ImagesRequest;
  let { ext } = req.query as unknown as ImagesRequest;

  if (width && height && imagename && !(isNaN(width) || isNaN(height))) {
    ext = ext ? ext : 'jpg';
    await convertImage(+width, +height, imagename, ext);
    next();
  } else if (isNaN(width) || isNaN(height)) {
    res.send(`${isNaN(width) ? 'width' : 'height'} is not a valid number`);
  } else {
    return next();
  }
};

// Images API
images.get(
  '/',
  convertImagesReq,
  (req: express.Request, res: express.Response): void => {
    let { width, height, imagename, ext } =
      req.query as unknown as ImagesRequest;
    if (width && height && imagename) {
      ext = ext ? ext : 'jpg';

      const filepath = `src/assets/thumbnails/${imagename}${height}x${width}.${ext}`;
      res.sendFile(path.resolve(filepath));
    } else {
      res.send('missing mandatory parametars');
    }
  }
);

export default images;
