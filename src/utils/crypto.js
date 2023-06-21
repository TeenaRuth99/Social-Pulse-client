import CryptoJS from "crypto-js";

/**
 * Encrypts a string using AES (Advanced Encryption Standard).
 * @param {string} value - The string to encrypt.
 * @returns {string} The encrypted string.
 */
export const StringEncryption = (value) => {
  return CryptoJS.AES.encrypt(value, process.env.REACT_APP_CRYPTO_SECRET).toString()
}

/**
 * Applies the ROT13 cipher to text.
 * @param {string} text - The text to encrypt.
 * @returns {string} The encrypted text.
 */
const rot13 = (text) => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i)
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(((charCode - 65 + 13) % 26) + 65)
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(((charCode - 97 + 13) % 26) + 97)
    } else if (charCode >= 48 && charCode <= 57) {
      result += '='
      result += String.fromCharCode(((charCode - 48 + 10) % 26) + 65)
    } else {
      result += text[i]
    }
  }
  return result
}

/**
 * Decrypts text that was encrypted using the ROT13 cipher.
 * @param {string} encryptedText - The encrypted text.
 * @returns {string} The decrypted text.
 */
const rot13decrypt = (text) => {
  let result = ''
  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i)
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(((charCode - 65 - 13 + 26) % 26) + 65)
    } else if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(((charCode - 97 - 13 + 26) % 26) + 97)
    } else if (text[i] === '=') {
      i++
      result += String.fromCharCode(
        ((text.charCodeAt(i) - 65 - 10 + 10) % 10) + 48
      )
    } else {
      result += text[i]
    }
  }
  return result
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
const shiftedAlphabet = '4ef5h1j2l7n0p8r3t6v9xyzoiksdgumqwabc'
const letters = 'abcdefghijklmnopqrstuvwxyz'
const shiftedLetters = letters.split('').map((letter) => {
  const charCode = letter.charCodeAt(0)
  return String.fromCharCode(((charCode - 97 + 3) % 26) + 97)
})
function getRandomChar() {
  const index = Math.floor(Math.random() * letters.length)
  return letters[index]
}

/**
 * Encrypts text using the Caesar cipher.
 * @param {string} text - The text to encrypt.
 * @returns {string} The encrypted text.
 */
function caesarCipherEncrypt(text) {
  const paddingChar = getRandomChar
  let padding = ''
  let encryptedText = text.replace(/[\w\d]/gi, (letter) => {
    const index = alphabet.indexOf(letter.toLowerCase())
    return index === -1
      ? letter
      : letter === letter.toLowerCase()
      ? shiftedAlphabet[index]
      : shiftedAlphabet[index].toUpperCase()
  })
  while (encryptedText.length < 5) {
    const _ = paddingChar()
    encryptedText = _ + encryptedText
    padding = shiftedLetters[letters.indexOf(_)] + padding
  }
  return encryptedText + ':' + padding
}

/**
 * Decrypts text that was encrypted using the Caesar cipher.
 * @param {string} encryptedText - The encrypted text.
 * @returns {string} The decrypted text.
 */
function caesarCipherDecrypt(encryptedText) {
  const [text, padding] = encryptedText.split(':')
  if (encryptedText.length < 5 || !encryptedText.includes(':')) {
    throw new Error('Invalid Param Value')
  }
  for (let i = 0; i < padding.length; i++) {
    if (padding[i] !== shiftedLetters[letters.indexOf(text[i])]) {
      throw new Error(`Invalid Param Value`)
    }
  }
  let decryptedText = text.replace(/[\w\d]/gi, (letter) => {
    const index = shiftedAlphabet.indexOf(letter.toLowerCase())
    return index === -1
      ? letter
      : letter === letter.toLowerCase()
      ? alphabet[index]
      : alphabet[index].toUpperCase()
  })
  decryptedText = decryptedText.slice(padding.length)
  return decryptedText
}

/**
 * Encrypts text using a combination of the Caesar cipher and ROT13.
 * @param {string} originalString - The original, unencrypted text.
 * @returns {string} The encrypted text.
 */
export const ParamEncryption = (originalString) => {
  const rot = caesarCipherEncrypt(originalString)
  const encryptedText = rot13(rot)
  return encryptedText
}

/**
 * Decrypts text that was encrypted using a combination of the Caesar cipher and ROT13.
 * @param {string} encryptedText - The encrypted text.
 * @returns {string} The decrypted text.
 */
export const ParamDecryption = (encryptedText) => {
  const decryptedText = rot13decrypt(encryptedText)
  const decryptRot = caesarCipherDecrypt(decryptedText)
  return decryptRot
}
