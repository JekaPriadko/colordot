import shuffleArray from '@/helpers/shuffleArray'
import type { GameSetup } from '@/type/TypeGame'
export const generateColorsData = (gameSetup: GameSetup): string[] | false => {
  if (!gameSetup.players) return false

  const countColors = gameSetup.countColorsForUser ?? 0
  const countColorsWhite = Math.pow(gameSetup.size, 2) - countColors * gameSetup.players

  const userColors = gameSetup.colors.flatMap((color) => Array(countColors).fill(color))
  const whiteColors = Array(countColorsWhite).fill('white')

  return shuffleArray(userColors.concat(whiteColors))
}
