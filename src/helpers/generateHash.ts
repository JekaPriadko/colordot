import sha256 from 'crypto-js/sha256'

export const generateHash = (data: string) => {
  const hash = sha256(data)
  return hash.toString()
}
