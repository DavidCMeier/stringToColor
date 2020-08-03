export interface LimitColor {
  red: { min: number, max: number },
  green: { min: number, max: number },
  blue: { min: number, max: number },
}

export interface ColorRGB {
  red: number,
  green: number,
  blue: number,
}

export function stringToColor(text: string, rgb = false, limitColor?: LimitColor): string | ColorRGB {
  const division = Math.floor(text.length / 3)
  const values = limitValues(limitColor)(Array.from(text, (letter: string) => {
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

const limitValues = (limits: LimitColor) => (colors) => {
  return {
    red: linearConversion(limits?.red ? checkMinMax(limits.red) : {min: 0, max: 255})(colors.red),
    green: linearConversion(limits?.green ? checkMinMax(limits.green) : {min: 0, max: 255})(colors.green),
    blue: linearConversion(limits?.blue ? checkMinMax(limits.blue) : {min: 0, max: 255})(colors.blue),
  }
}
const linearConversion = ({min, max}) => (number) => {
  return (((number - min) % (max - min)) + (max - min)) % (max - min) + min;
}

const rgbToHex = ({red, green, blue}) => {
  return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}

const checkMinMax = ({min, max}) => {
  if (min < 0 || max > 255) {
    throw new Error('The limits must be between 0 and 255 both included')
  }
  if (min > max) {
    throw new Error('the minimum cannot be greater than the maximum')
  }
  return {min, max}
}
