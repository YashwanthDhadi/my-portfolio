/**
 * Generates optimised web images from the original source photo.
 *
 *   npm run images
 *
 * Re-run this after replacing the source photo. Outputs:
 *   src/assets/images/profile-640.webp  (hero, 2x for retina at 320px)
 *   src/assets/images/profile-352.webp  (mobile hero, 2x at 176px)
 *   public/images/og-image.png          (1200x630 link preview card)
 *   public/images/apple-touch-icon.png  (180x180)
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(root, 'source-assets', 'profile-photo.png')
const out = (...p) => path.join(root, ...p)

await mkdir(out('src/assets/images'), { recursive: true })
await mkdir(out('public/images'), { recursive: true })

for (const size of [640, 352]) {
  await sharp(SOURCE)
    .resize(size, size)
    .webp({ quality: 82 })
    .toFile(out(`src/assets/images/profile-${size}.webp`))
}

// Link-preview card: photo on the right, name and title on the left.
const P = 380
const circle = Buffer.from(
  `<svg width="${P}" height="${P}"><circle cx="${P / 2}" cy="${P / 2}" r="${P / 2 - 6}" fill="#fff"/></svg>`,
)
const photo = await sharp(SOURCE)
  .resize(P, P)
  .composite([{ input: circle, blend: 'dest-in' }])
  .png()
  .toBuffer()
const text = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="12" height="630" fill="#2563EB"/>
  <text x="90" y="250" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="64" font-weight="700" fill="#0F172A">Yashwanth Dhadi</text>
  <text x="90" y="320" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="27" font-weight="500" fill="#2563EB">Python Developer | AI/ML &amp; Backend Development</text>
  <text x="90" y="375" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="24" fill="#475569">Building intelligent applications with Python &amp; AI</text>
</svg>`)
await sharp(text)
  .composite([{ input: photo, left: 765, top: 125 }])
  .png({ compressionLevel: 9 })
  .toFile(out('public/images/og-image.png'))

await sharp(out('public/favicon.svg'), { density: 300 })
  .resize(180, 180)
  .flatten({ background: '#ffffff' })
  .png()
  .toFile(out('public/images/apple-touch-icon.png'))

console.log('Images generated.')
