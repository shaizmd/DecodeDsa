export default interface Algorithm {
  name: string
  generateSteps(array: number[]): Step[]
}