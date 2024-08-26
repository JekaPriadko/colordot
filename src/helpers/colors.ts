import { colors } from '@/const/colors'

export const filterColorsFree = (listColorUsed: string[]): string[] => {
  return colors.filter((color) => !listColorUsed.includes(color))
}

export const getRandomColor = (availableColors: string[]): string | null => {
  if (availableColors.length === 0) return null

  const index = Math.floor(Math.random() * availableColors.length)
  return availableColors.splice(index, 1)[0]
}
