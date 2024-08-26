import type { User } from '@/type/TypeUser'

export type GameSetup = {
  colors: string[]
  size: 5 | 6 | 7
  players: number | null
  countColorsForUser: number | 0
  currentPlayer: User['id'] | null
  choosenCells: [number, number][]
  timeForRemember: number
  showGamePreview: boolean
  isGameStart: boolean
}

export type ItemGameBoard = {
  count: number
  color: string
}

export type GameBoard = ItemGameBoard[][]

export type StateGameStore = {
  usersHash: string
  gameSetup: GameSetup
  gameBoard: GameBoard
}
