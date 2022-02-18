import express from 'express';
import { Sharp as SharpInterface } from 'sharp';
import { ImagesRequest } from '../../../types/image';

// constants
const images = express.Router();
const sharp = require('sharp');
const path = require('path');
const fs = require('fs/promises');

// Convert Image Function
const convertImage = async (
  width: number,
  height: number,
  imageName: string,
  ext?: string
) => {
  try {
    const readFile = async (): Promise<unknown> => {
      const myFile = await fs.readFile(
        `src/assets/fulls/${imageName}.jpg`,
        (data: string, err: unknown) => {
          if (err) console.log(err);
        }
      );
      return myFile;
    };
    if (width && height && imageName && (await readFile())) {
      ext = ext ? ext : 'jpg';
      const image: SharpInterface = sharp(`src/assets/fulls/${imageName}.jpg`);
      const converting = image
        .resize(width, height)
        .toFile(`src/assets/thumbnails/${imageName}.${ext}`, (err: unknown) => {
          return err;
        });
      return converting;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

// Convert Image Middleware
const convertImagesReq = (
  req: express.Request,
  res: express.Response,
  next: Function
): void | boolean => {
  const { width, height, imagename } = req.query as unknown as ImagesRequest;
  let { ext } = req.query as unknown as ImagesRequest;
  if (width && height && imagename) {
    ext = ext ? ext : 'jpg';
    convertImage(+width, +height, imagename, ext);
    next();
  } else {
    return next();
  }
};

// Images API
images.get('/', convertImagesReq, (req, res) => {
  const { width, height, imagename } = req.query as unknown as ImagesRequest;
  let { ext } = req.query as unknown as ImagesRequest;
  if (width && height && imagename) {
    ext = ext ? ext : 'jpg';
    const filepath = `src/assets/thumbnails/${imagename}.${ext}`;
    res.sendFile(path.resolve(filepath));
  } else {
    res.send('missing mandatory parametars');
  }
});

export { images, convertImage };
