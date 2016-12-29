const push = (obj: any, item: [string, number]): boolean => {
  let rtn: boolean = true
  if (obj[item[1]] !== undefined) {
    delete obj[obj[item[1]]]
    delete obj[item[1]]
    rtn = false
  }

  obj[item[0]] = item[1]
  obj[item[1]] = item[0]

  obj._index = item[1]

  return rtn
}

export const init = (Enum: (Array<string | [string, number]>)): any => {
  let i = 0

  return Enum
    .reduce((result: any, c: (string | [string, number])) => {

      if (typeof c === 'string') {
        c = [c, i + 1]
      }

      if (push(result, c)) i++

      return result
    }, {})
}

export const extend = (obj: any, ...Enums: Array<(Array<string | [string, number]>)>): any => {
  const length = Enums.length
  if (length === 0) return obj

  Enums
    .forEach(Enum => {
      let i = obj._index

      Enum
        .reduce((result: any, c: (string | [string, number])) => {

          if (typeof c === 'string') {
            c = [c, i + 1]
          }

          if (push(result, c)) i++

          return result
        }, obj)
    })
  return obj
}
