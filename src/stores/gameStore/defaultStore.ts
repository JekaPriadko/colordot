import type { GameSetup, GameBoard } from '@/type/TypeGame'

export const defaultGameSetup = (): GameSetup => ({
  colors: [],
  size: 5,
  players: null,
  countColorsForUser: 0,
  currentPlayer: null,
  choosenCells: [],
  timeForRemember: 30,
  showGamePreview: true,
  isGameStart: false
})

export const defaultGameBoard = (): GameBoard => []
