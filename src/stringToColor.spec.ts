import { LimitColor, stringToColor } from "./stringToColor";

test('stringToColor in hex', () => {
  const basicColorHex = stringToColor('test', {output: 'HEX'})
  expect(basicColorHex).toMatchSnapshot()
})

test('stringToColor in RGB',() =>{
  const basicColorRGB = stringToColor('test', {output: 'RGB'})
  expect(basicColorRGB).toMatchSnapshot()
})

test('test limits min functions', () => {
  const limits: LimitColor = {
    blue: { min: -1, max: 255},
    green: { min: -1, max: 255},
    red: { min: -1, max: 255},
  }
  expect(() => {
    stringToColor('test', {output: 'HEX', limitColor: limits})
  }).toThrow('The limits must be between 0 and 255 both included')
})

test( 'limits max function', () => {
  const limits: LimitColor = {
    blue: { min: 0, max: 256},
    green: { min: 0, max: 255},
    red: { min: 0, max: 255},
  }
  expect(() => {
    stringToColor('test', {output: 'HEX', limitColor: limits})
  }).toThrowError('The limits must be between 0 and 255 both included')
})

test('limits: the minimum cannot be greater than the maximum', () => {
  const limits: LimitColor = {
    blue: { min: 3, max: 2},
    green: { min: 0, max: 255},
    red: { min: 0, max: 255},
  }
  expect(() => {
    stringToColor('test', {output: 'HEX', limitColor: limits})
  }).toThrowError('the minimum cannot be greater than the maximum')
})

test('check limits', () => {
  const limits: LimitColor = {
    blue: { min: 0, max: 2},
    green: { min: 0, max: 2},
    red: { min: 0, max: 2},
  }
  expect(() => {
    stringToColor('test', {output: 'HEX', limitColor: limits})
  }).toMatchSnapshot()
})

test( 'return black', () => {
  expect(stringToColor('', {output: 'HEX'})).toBe('#000000')
})

