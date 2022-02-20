import { Sharp as SharpInterface } from 'sharp';
const fs = require('fs/promises');
const sharp = require('sharp');
const path = require('path');

const mainPath = (imageName: string) =>
  path.join(__dirname, `../assets/fulls/${imageName}.jpg`);

// Convert Image Function
const convertImage = async (
  width: number,
  height: number,
  imageName: string,
  ext?: string
): Promise<unknown> => {
  try {
    const readFile = async (): Promise<unknown> => {
      const myFile = await fs.readFile(
        mainPath(imageName),
        (data: string, err: unknown) => {
          if (err) console.log(err);
        }
      );
      return myFile;
    };
    if (width && height && imageName && (await readFile())) {
      ext = ext ? ext : 'jpg';
      const image: SharpInterface = sharp(mainPath(imageName));
      const converting = image
        .resize(width, height)
        .toFile(
          path.join(
            __dirname,
            `../assets/thumbnails/${imageName}${height}x${width}.${ext}`
          ),
          (err: unknown) => {
            return err;
          }
        );
      return converting;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
};

export default convertImage;
