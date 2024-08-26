export default function generateSecureRandomId(): string {
  return [...Array(10)].map(() => ((Math.random() * 36) | 0).toString(36)).join('')
}
