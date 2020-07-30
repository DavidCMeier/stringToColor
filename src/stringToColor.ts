export const stringToColor = (text: string, rgb:boolean, min = 0, max = 255) =>  {
  const division = Math.floor(text.length / 3)
  const values = limitValues({min, max})(Array.from(text, (letter: string) => {
    return letter.charCodeAt(0)
  }).reduce((acc, curr, index) => {
      return index < division
        ? {...acc, red: acc.red + curr}
        : index < division * 2
          ? {...acc, green: acc.green + curr}
          : {...acc, blue: acc.blue + curr}
    }, {red: 0, green: 0, blue: 0}
  ))
  return rgb ? values : rgbToHex(values)

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

const rgbToHex = ({red, green, blue}) => {
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}
