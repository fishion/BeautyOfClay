import path from "path"
import { readdirSync, Dirent } from "fs"
import { fileURLToPath } from "url"
import config from "../../config.json" with { type: "json" }

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const srcRoot = path.resolve(path.dirname(__filename), "../")

const images: string[] = readdirSync(path.join(srcRoot, config.slideshow.imagesPath), {
  withFileTypes: true,
})
  .filter((item: Dirent) => !item.isDirectory())
  .filter((item: Dirent) => !item.name.match(/^\./))
  .map((item: Dirent) => `../img/slideshow/${item.name}`)

const secondsPerImage = config.slideshow.secondsPerImage
const fullAnimationTime = images.length * secondsPerImage

export default {
  slideshow: {
    images,
    secondsPerImage,
    fullAnimationTime,
    keyframePercentPerImage: +((secondsPerImage * 100) / fullAnimationTime).toFixed(2),
    keyframePercentTransition: +((secondsPerImage * 100) / fullAnimationTime / 2).toFixed(2),
  },
}
