export type LetterScript = 'hiragana' | 'katakana' | 'number' | 'alphabet'

export type LetterItem = {
  id: string
  char: string
  /** TTS 用（文字そのもの） */
  speak: string
  speakLang: 'ja' | 'en'
  /** 結びつけて覚えることば */
  word: string
  /** 絵（絵文字） */
  emoji: string
  /** 英語例（アルファベット用など） */
  wordEn?: string
}

type Cue = { word: string; emoji: string; wordEn?: string }

const HIRA_CUES: Record<string, Cue> = {
  あ: { word: 'あり', emoji: '🐜' },
  い: { word: 'いぬ', emoji: '🐕' },
  う: { word: 'うさぎ', emoji: '🐇' },
  え: { word: 'えび', emoji: '🦐' },
  お: { word: 'おにぎり', emoji: '🍙' },
  か: { word: 'かめ', emoji: '🐢' },
  き: { word: 'きつね', emoji: '🦊' },
  く: { word: 'くま', emoji: '🐻' },
  け: { word: 'ケーキ', emoji: '🎂' },
  こ: { word: 'こあら', emoji: '🐨' },
  さ: { word: 'さかな', emoji: '🐟' },
  し: { word: 'しまうま', emoji: '🦓' },
  す: { word: 'すいか', emoji: '🍉' },
  せ: { word: 'せみ', emoji: '🦗' },
  そ: { word: 'そら', emoji: '🌤️' },
  た: { word: 'たこ', emoji: '🐙' },
  ち: { word: 'ちょうちょ', emoji: '🦋' },
  つ: { word: 'つき', emoji: '🌙' },
  て: { word: 'てんとうむし', emoji: '🐞' },
  と: { word: 'とり', emoji: '🐦' },
  な: { word: 'なす', emoji: '🍆' },
  に: { word: 'にんじん', emoji: '🥕' },
  ぬ: { word: 'ぬいぐるみ', emoji: '🧸' },
  ね: { word: 'ねこ', emoji: '🐈' },
  の: { word: 'のり', emoji: '🍙' },
  は: { word: 'はな', emoji: '🌸' },
  ひ: { word: 'ひよこ', emoji: '🐤' },
  ふ: { word: 'ふね', emoji: '🚢' },
  へ: { word: 'へび', emoji: '🐍' },
  ほ: { word: 'ほし', emoji: '⭐' },
  ま: { word: 'まめ', emoji: '🫘' },
  み: { word: 'みかん', emoji: '🍊' },
  む: { word: 'むし', emoji: '🐛' },
  め: { word: 'めがね', emoji: '👓' },
  も: { word: 'もも', emoji: '🍑' },
  や: { word: 'やぎ', emoji: '🐐' },
  ゆ: { word: 'ゆき', emoji: '❄️' },
  よ: { word: 'ヨット', emoji: '⛵' },
  ら: { word: 'らいおん', emoji: '🦁' },
  り: { word: 'りんご', emoji: '🍎' },
  る: { word: 'ルビー', emoji: '💎' },
  れ: { word: 'れもん', emoji: '🍋' },
  ろ: { word: 'ロボット', emoji: '🤖' },
  わ: { word: 'わに', emoji: '🐊' },
  を: { word: 'おうちへ（を）', emoji: '🏠' },
  ん: { word: 'おんぷ', emoji: '🎵' },
}

const KATA_CUES: Record<string, Cue> = {
  ア: { word: 'アイス', emoji: '🍦' },
  イ: { word: 'イス', emoji: '🪑' },
  ウ: { word: 'ウサギ', emoji: '🐇' },
  エ: { word: 'エアコン', emoji: '❄️' },
  オ: { word: 'オレンジ', emoji: '🍊' },
  カ: { word: 'カメラ', emoji: '📷' },
  キ: { word: 'キリン', emoji: '🦒' },
  ク: { word: 'クッキー', emoji: '🍪' },
  ケ: { word: 'ケーキ', emoji: '🎂' },
  コ: { word: 'コップ', emoji: '🥛' },
  サ: { word: 'サッカー', emoji: '⚽' },
  シ: { word: 'シャツ', emoji: '👕' },
  ス: { word: 'スイカ', emoji: '🍉' },
  セ: { word: 'セーター', emoji: '🧥' },
  ソ: { word: 'ソファ', emoji: '🛋️' },
  タ: { word: 'タクシー', emoji: '🚕' },
  チ: { word: 'チーズ', emoji: '🧀' },
  ツ: { word: 'ツナ', emoji: '🐟' },
  テ: { word: 'テレビ', emoji: '📺' },
  ト: { word: 'トマト', emoji: '🍅' },
  ナ: { word: 'ナイフ', emoji: '🔪' },
  ニ: { word: 'ニンジン', emoji: '🥕' },
  ヌ: { word: 'ヌードル', emoji: '🍜' },
  ネ: { word: 'ネクタイ', emoji: '👔' },
  ノ: { word: 'ノート', emoji: '📓' },
  ハ: { word: 'ハンバーガー', emoji: '🍔' },
  ヒ: { word: 'ヒツジ', emoji: '🐑' },
  フ: { word: 'フォーク', emoji: '🍴' },
  ヘ: { word: 'ヘリコプター', emoji: '🚁' },
  ホ: { word: 'ホットドッグ', emoji: '🌭' },
  マ: { word: 'マスク', emoji: '😷' },
  ミ: { word: 'ミルク', emoji: '🥛' },
  ム: { word: 'ムシ', emoji: '🐛' },
  メ: { word: 'メール', emoji: '📧' },
  モ: { word: 'モモ', emoji: '🍑' },
  ヤ: { word: 'ヤクルト', emoji: '🧃' },
  ユ: { word: 'ユニコーン', emoji: '🦄' },
  ヨ: { word: 'ヨット', emoji: '⛵' },
  ラ: { word: 'ライオン', emoji: '🦁' },
  リ: { word: 'リンゴ', emoji: '🍎' },
  ル: { word: 'ルーペ', emoji: '🔍' },
  レ: { word: 'レモン', emoji: '🍋' },
  ロ: { word: 'ロケット', emoji: '🚀' },
  ワ: { word: 'ワニ', emoji: '🐊' },
  ヲ: { word: 'ヲ（お）', emoji: '🏠' },
  ン: { word: 'パンダのン', emoji: '🐼' },
}

const NUM_CUES: { speak: string; word: string; emoji: string }[] = [
  { speak: 'ゼロ', word: 'まる（0こ）', emoji: '⭕' },
  { speak: 'いち', word: 'いちご 1こ', emoji: '🍓' },
  { speak: 'に', word: 'ねこ 2ひき', emoji: '🐈' },
  { speak: 'さん', word: 'さんかく', emoji: '🔺' },
  { speak: 'よん', word: 'よつば', emoji: '🍀' },
  { speak: 'ご', word: 'ごはん', emoji: '🍚' },
  { speak: 'ろく', word: 'ろくぼうし', emoji: '🎩' },
  { speak: 'なな', word: 'レインボー', emoji: '🌈' },
  { speak: 'はち', word: 'はち', emoji: '🐝' },
  { speak: 'きゅう', word: 'きゅうきゅうしゃ', emoji: '🚑' },
  { speak: 'じゅう', word: 'じゅう（10）', emoji: '🔟' },
]

const ABC_CUES: Record<string, Cue> = {
  A: { word: 'Apple', emoji: '🍎', wordEn: 'apple' },
  B: { word: 'Ball', emoji: '⚽', wordEn: 'ball' },
  C: { word: 'Cat', emoji: '🐈', wordEn: 'cat' },
  D: { word: 'Dog', emoji: '🐕', wordEn: 'dog' },
  E: { word: 'Egg', emoji: '🥚', wordEn: 'egg' },
  F: { word: 'Fish', emoji: '🐟', wordEn: 'fish' },
  G: { word: 'Grape', emoji: '🍇', wordEn: 'grape' },
  H: { word: 'House', emoji: '🏠', wordEn: 'house' },
  I: { word: 'Ice cream', emoji: '🍦', wordEn: 'ice cream' },
  J: { word: 'Juice', emoji: '🧃', wordEn: 'juice' },
  K: { word: 'Kite', emoji: '🪁', wordEn: 'kite' },
  L: { word: 'Lion', emoji: '🦁', wordEn: 'lion' },
  M: { word: 'Moon', emoji: '🌙', wordEn: 'moon' },
  N: { word: 'Nose', emoji: '👃', wordEn: 'nose' },
  O: { word: 'Orange', emoji: '🍊', wordEn: 'orange' },
  P: { word: 'Penguin', emoji: '🐧', wordEn: 'penguin' },
  Q: { word: 'Queen', emoji: '👑', wordEn: 'queen' },
  R: { word: 'Rabbit', emoji: '🐇', wordEn: 'rabbit' },
  S: { word: 'Sun', emoji: '☀️', wordEn: 'sun' },
  T: { word: 'Train', emoji: '🚆', wordEn: 'train' },
  U: { word: 'Umbrella', emoji: '☂️', wordEn: 'umbrella' },
  V: { word: 'Violin', emoji: '🎻', wordEn: 'violin' },
  W: { word: 'Water', emoji: '💧', wordEn: 'water' },
  X: { word: 'Xylophone', emoji: '🎵', wordEn: 'xylophone' },
  Y: { word: 'Yacht', emoji: '⛵', wordEn: 'yacht' },
  Z: { word: 'Zebra', emoji: '🦓', wordEn: 'zebra' },
}

const HIRA_ORDER =
  'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん'
const KATA_ORDER =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

export const HIRAGANA: LetterItem[] = [...HIRA_ORDER].map((char, i) => {
  const cue = HIRA_CUES[char] ?? { word: char, emoji: '✨' }
  return {
    id: `h${i}`,
    char,
    speak: char,
    speakLang: 'ja' as const,
    word: cue.word,
    emoji: cue.emoji,
  }
})

export const KATAKANA: LetterItem[] = [...KATA_ORDER].map((char, i) => {
  const cue = KATA_CUES[char] ?? { word: char, emoji: '✨' }
  return {
    id: `k${i}`,
    char,
    speak: char,
    speakLang: 'ja' as const,
    word: cue.word,
    emoji: cue.emoji,
  }
})

export const NUMBERS: LetterItem[] = NUM_CUES.map((cue, n) => ({
  id: `n${n}`,
  char: String(n),
  speak: cue.speak,
  speakLang: 'ja' as const,
  word: cue.word,
  emoji: cue.emoji,
}))

export const ALPHABET: LetterItem[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((char, i) => {
  const cue = ABC_CUES[char]
  return {
    id: `a${i}`,
    char,
    speak: char,
    speakLang: 'en' as const,
    word: cue.word,
    emoji: cue.emoji,
    wordEn: cue.wordEn,
  }
})

export function lettersFor(script: LetterScript): LetterItem[] {
  switch (script) {
    case 'hiragana':
      return HIRAGANA
    case 'katakana':
      return KATAKANA
    case 'number':
      return NUMBERS
    case 'alphabet':
      return ALPHABET
  }
}

/** 「あ、あり」のように文字＋ことばで読み上げ */
export function speakPhraseFor(item: LetterItem): { text: string; lang: 'ja' | 'en' } {
  if (item.speakLang === 'en') {
    return { text: `${item.char}. ${item.wordEn ?? item.word}`, lang: 'en' }
  }
  if (item.char === String(Number(item.char)) && item.char.length === 1) {
    return { text: `${item.speak}。${item.word}`, lang: 'ja' }
  }
  return { text: `${item.char}、${item.word}`, lang: 'ja' }
}

export const SCRIPT_META: {
  id: LetterScript
  title: string
  desc: string
  tint: string
  picture: string
}[] = [
  { id: 'hiragana', title: 'ひらがな', desc: 'あ＝あり', tint: '#2aa89a', picture: 'あ' },
  { id: 'katakana', title: 'カタカナ', desc: 'ア＝アイス', tint: '#4cc9f0', picture: 'ア' },
  { id: 'number', title: 'すうじ', desc: '1＝いちご', tint: '#ffb703', picture: '123' },
  { id: 'alphabet', title: 'アルファベット', desc: 'A＝Apple', tint: '#ff6b6b', picture: 'ABC' },
]
