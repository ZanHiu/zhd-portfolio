import { inflateSync } from 'node:zlib'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { basename, dirname, resolve } from 'node:path'

function decodePng(path) {
  const file = readFileSync(path)
  const width = file.readUInt32BE(16); const height = file.readUInt32BE(20)
  if (file[24] !== 8 || file[25] !== 2 || file[28] !== 0) throw new Error(`${path}: expected non-interlaced RGB PNG`)
  const chunks = []; let offset = 8
  while (offset < file.length) { const length = file.readUInt32BE(offset); const type = file.toString('ascii', offset + 4, offset + 8); if (type === 'IDAT') chunks.push(file.subarray(offset + 8, offset + 8 + length)); offset += length + 12 }
  const packed = inflateSync(Buffer.concat(chunks)); const rowBytes = width * 3; const pixels = Buffer.alloc(rowBytes * height); let source = 0
  for (let y = 0; y < height; y += 1) {
    const filter = packed[source++]; const row = y * rowBytes
    for (let x = 0; x < rowBytes; x += 1) {
      const raw = packed[source++]; const left = x >= 3 ? pixels[row + x - 3] : 0; const up = y ? pixels[row + x - rowBytes] : 0; const upLeft = y && x >= 3 ? pixels[row + x - rowBytes - 3] : 0
      if (filter === 0) pixels[row + x] = raw
      else if (filter === 1) pixels[row + x] = (raw + left) & 255
      else if (filter === 2) pixels[row + x] = (raw + up) & 255
      else if (filter === 3) pixels[row + x] = (raw + Math.floor((left + up) / 2)) & 255
      else if (filter === 4) { const p = left + up - upLeft; const pa = Math.abs(p - left); const pb = Math.abs(p - up); const pc = Math.abs(p - upLeft); pixels[row + x] = (raw + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft)) & 255 }
      else throw new Error(`${path}: unsupported PNG filter ${filter}`)
    }
  }
  return { width, height, pixels }
}

const [referencePath, actualPath, outputBase] = process.argv.slice(2)
if (!referencePath || !actualPath || !outputBase) throw new Error('usage: npm run visual:diff -- reference.png actual.png output/base')
const reference = decodePng(referencePath); const actual = decodePng(actualPath)
if (reference.width !== actual.width || reference.height !== actual.height) throw new Error('image dimensions differ')
const diff = Buffer.alloc(reference.pixels.length); let total = 0; let changed = 0; let max = 0
for (let i = 0; i < diff.length; i += 1) { const value = Math.abs(reference.pixels[i] - actual.pixels[i]); diff[i] = Math.min(255, value * 3); total += value; max = Math.max(max, value); if (value > 16) changed += 1 }
mkdirSync(dirname(resolve(outputBase)), { recursive: true })
writeFileSync(`${outputBase}.ppm`, Buffer.concat([Buffer.from(`P6\n${reference.width} ${reference.height}\n255\n`), diff]))
const result = { reference: basename(referencePath), actual: basename(actualPath), width: reference.width, height: reference.height, meanAbsoluteChannelError: Number((total / diff.length).toFixed(3)), changedChannelPercent: Number((changed * 100 / diff.length).toFixed(3)), maxChannelError: max, diff: `${outputBase}.ppm` }
writeFileSync(`${outputBase}.json`, JSON.stringify(result, null, 2)); console.log(JSON.stringify(result))
