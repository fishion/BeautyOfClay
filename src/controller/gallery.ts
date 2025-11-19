import path from "path"
import { readdirSync, Dirent } from 'fs'
import { fileURLToPath } from "url"
import config from '../../config.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const srcRoot = path.resolve(path.dirname(__filename),'../')

const getImages = (dirPath: string): string[] => {
  return readdirSync(path.join(srcRoot, dirPath), { withFileTypes: true })
    .filter((item: Dirent) => !item.isDirectory())
    .filter((item: Dirent) => !item.name.match(/^\./))
    .reverse()
    .map((item: Dirent) => item.name);
};

export default {
  childrensArtImages: {
    baseURL: config.galleryPaths.childrensArtImages,
    images: getImages(config.galleryPaths.childrensArtImages)
  },
  galleryImages: {
    baseURL: config.galleryPaths.gallery,
    images: getImages(config.galleryPaths.gallery)
  }
};
