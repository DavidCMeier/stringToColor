export interface LimitColor {
  red?: { min: number, max: number },
  green?: { min: number, max: number },
  blue?: { min: number, max: number },
}

export interface ColorRGB {
  red: number,
  green: number,
  blue: number,
}

export type StringToColorHEX = (text: string) => string
export type StringToColorRGB = (text: string) => ColorRGB

export function stringToColor(output: 'HEX' | {output?: 'HEX', limitColor?: LimitColor}): StringToColorHEX
export function stringToColor(output: 'RGB' | {output?: 'RGB', limitColor?: LimitColor}): StringToColorRGB
export function stringToColor(text: string, config?: {output?: 'HEX', limitColor?: LimitColor}): string
export function stringToColor(text: string, config?: {output?: 'RGB', limitColor?: LimitColor}): ColorRGB
export function stringToColor(
  textOrOutputOrConfig: string | 'HEX' | 'RGB' | {output?: 'HEX' | 'RGB', limitColor?: LimitColor},
  config: {output?: 'HEX' | 'RGB', limitColor?: LimitColor} = {output: 'HEX'}
): string | ColorRGB | StringToColorHEX | StringToColorRGB {
  if (['HEX', 'RGB'].includes(textOrOutputOrConfig as string) || typeof textOrOutputOrConfig !== 'string') {
    return stringToColorConfigured(textOrOutputOrConfig as any)
  } else {
    return stringToColorConfigured(config)(textOrOutputOrConfig)
  }
}

function stringToColorConfigured(
  outputOrConfig: 'HEX' | 'RGB' | {output?: 'HEX' | 'RGB', limitColor?: LimitColor}
): StringToColorHEX | StringToColorRGB {
  const config = typeof outputOrConfig === 'string'
    ? { output: outputOrConfig }
    : outputOrConfig

  return ((text: string): string | ColorRGB => {
    const output = config?.output || 'HEX'
    const division = Math.floor(text.length / 3)
    const colors = Array
      .from(text, (letter: string) => letter.charCodeAt(0))
      .reduce((acc, curr, index) => {
        return index < division
          ? {...acc, red: acc.red + curr}
          : index < division * 2
            ? {...acc, green: acc.green + curr}
            : {...acc, blue: acc.blue + curr}
      }, {red: 0, green: 0, blue: 0})

    const rgb = limitValues(config?.limitColor, colors)
    return output === 'RGB' ? rgb : rgbToHex(rgb)
  }) as any
}

const limitValues = (limits: LimitColor | undefined, colors: ColorRGB) => {
  return {
    red: linearConversion(limits?.red ? checkMinMax(limits.red) : {min: 0, max: 255})(colors.red),
    green: linearConversion(limits?.green ? checkMinMax(limits.green) : {min: 0, max: 255})(colors.green),
    blue: linearConversion(limits?.blue ? checkMinMax(limits.blue) : {min: 0, max: 255})(colors.blue),
  }
}

const linearConversion = ({min, max}) => (n) => {
  return (((n - min) % (max - min)) + (max - min)) % (max - min) + min
}

const rgbToHex = ({red, green, blue}) => {
  return '#' + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)
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
