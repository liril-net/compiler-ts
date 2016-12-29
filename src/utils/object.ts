export const extend = (obj: any, ...rest: Array<any>): any => {
  const length = rest.length
  if (length === 0) return obj

  for (let index = 0; index < length; index++) {
    const source = rest[index]
    const keys = Object.keys(source)
    const l = keys.length

    for (let i = 0; i < l; i++) {
      const key = keys[i]
      obj[key] = source[key]
    }

  }

  return obj
}
