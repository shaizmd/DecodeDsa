export default interface Step {
  array: number[]
  description: string
  code: string
  comparing?: number[]
  swapping?: number[]
  sorted?: number[]
  pivot?: number
}
