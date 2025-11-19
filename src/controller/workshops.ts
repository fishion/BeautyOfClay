import path from "path"
import { readdirSync, Dirent } from 'fs'
import { fileURLToPath } from "url"
import config from '../../config.json' with { type: 'json' }

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const srcRoot = path.resolve(path.dirname(__filename),'../')

const images: Dirent[] = readdirSync(path.join(srcRoot, config.galleryPaths.workshop), { withFileTypes: true })
  .filter(item => !item.isDirectory())
  .filter(item => !item.name.match(/^\./));

export default {
  workshopImages: images.map(item => item.name),
  baseURL: config.galleryPaths.workshop
};
