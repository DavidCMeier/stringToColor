export const stringToColor = (text) =>  {
  const division = Math.floor(text.length / 3)
  return limitValues({min: 0, max: 255})(Array.from(text, (letter: string) => {
    return letter.charCodeAt(0)
  }).reduce((acc, curr, index) => {
      return index < division
        ? {...acc, red: acc.red + curr}
        : index < division * 2
          ? {...acc, green: acc.green + curr}
          : {...acc, blue: acc.blue + curr}
    }, {red: 0, green: 0, blue: 0}
  ))

}
const limitValues = ({min, max}) => (colors) => {
  return {
    red: linearConversion(min)(max)(colors.red),
    green: linearConversion(min)(max)(colors.green),
    blue: linearConversion(min)(max)(colors.blue),
  }
}
const linearConversion = (min) => (max) => (number) => {
  return (((number - min) % (max - min)) + (max - min)) % (max - min) + min;
}
