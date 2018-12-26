
// TODO: remove -- generating a pleasantly increasing scaling scale from 4px up

const makeSizingScale = ({ steps, baseSize }) => {
  const scaleObject = {}

  for (let i = 0; i < steps.length; i++) {
    scaleObject[i] = baseSize * steps[i]
  }

  return scaleObject
}

const defaultSteps = [
  0.25,
  0.5,
  0.75,
  1,
  1.5,
  2,
  3,
  4,
  5,
  8,
  12,
  16,
  24,
  32,
  40,
  48,
]

const scale = makeSizingScale({ steps: defaultSteps, baseSize: 16 })
console.log('scale yo', scale)
