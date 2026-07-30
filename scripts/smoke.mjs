import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const index = join(dist, 'index.html')

if (!existsSync(index)) {
  console.error('smoke fail: dist/index.html missing')
  process.exit(1)
}

const html = readFileSync(index, 'utf8')
if (!html.includes('root')) {
  console.error('smoke fail: root mount missing')
  process.exit(1)
}

const assets = join(dist, 'assets')
if (!existsSync(assets) || readdirSync(assets).length === 0) {
  console.error('smoke fail: dist/assets empty')
  process.exit(1)
}

const wordsPath = join(process.cwd(), 'src/data/words.ts')
const wordsSrc = readFileSync(wordsPath, 'utf8')
const count = (wordsSrc.match(/id:\s*'/g) ?? []).length
if (count < 100) {
  console.error(`smoke fail: too few words (${count})`)
  process.exit(1)
}

console.log(`smoke ok: build present, words=${count}`)
