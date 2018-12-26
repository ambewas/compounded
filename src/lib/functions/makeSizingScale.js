const defaultSteps = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 8, 12, 16, 24, 32, 40, 48];

// generate a pleasantly increasing scaling scale from 4px up
const makeSizingScale = ({ steps = defaultSteps, baseSize }) => {
  const scaleObject = {};

  for (let i = 0; i < steps.length; i++) {
    scaleObject[i] = baseSize * steps[i];
  }

  return scaleObject;
};

export default makeSizingScale;

// // example     // initialise a scale to base all margin/padding/font size steps on.
//     // some config is possible, but we include a nice default increment
//     const scale = makeSizingScale({ baseSize: 16 });
//     console.log("scale yo", scale);
