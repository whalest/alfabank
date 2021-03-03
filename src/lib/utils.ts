import { Attribute } from '../types'

export const isObject = (obj: any) => typeof obj === 'object' && obj !== null

export const stringify = (value: any) => {
  try {
    return JSON.stringify(value)
  } catch (e) {
    return value
  }
}

export const encode = (obj: object) => {
  const params = new URLSearchParams()

  for (let [key, value] of Object.entries(obj)) {
    if (!value) continue

    params.append(key, isObject(value) ? stringify(value) : value)
  }

  return params.toString()
}

export const paramsToObject = (arr: Attribute[]) => {
  let result: { [K: string]: any } = {}

  for (const item of arr) {
    result[item.name] = item.value
  }

  return result
}
