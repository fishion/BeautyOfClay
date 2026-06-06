import path from "path"
import { readdirSync, Dirent } from "fs"
import { fileURLToPath } from "url"
import config from "../../config.json" with { type: "json" }

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const srcRoot = path.resolve(path.dirname(__filename), "../")

const generalImgDir = path.join(config.galleryPaths.gallery, "general/")
const persiaMapDir = path.join(config.galleryPaths.gallery, "persiaMap/")

const getImages = (dirPath: string): string[] => {
  return readdirSync(path.join(srcRoot, dirPath), { withFileTypes: true })
    .filter((item: Dirent) => !item.isDirectory())
    .filter((item: Dirent) => !item.name.match(/^\./))
    .reverse()
    .map((item: Dirent) => item.name)
}

export default {
  persiaMap: {
    baseURL: persiaMapDir,
    images: getImages(persiaMapDir),
  },
  galleryImages: {
    baseURL: generalImgDir,
    images: getImages(generalImgDir),
  },
}
