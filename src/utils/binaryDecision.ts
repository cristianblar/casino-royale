import { getRandomInteger } from '.'

export function binaryDecision(probability: number): boolean {
  if (probability < 0 || probability > 1)
    throw new RangeError('Probability must be a float number between 0 and 1')

  const fixedProbability = probability * 10
  const randomNumber = getRandomInteger(1, 11)

  return randomNumber <= fixedProbability
}
