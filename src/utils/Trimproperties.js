export function TrimProperties(obj) {
    let newObj = {}
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        newObj[key] = value.trim()
      } else {
        newObj[key] = value
      }
    }
    return newObj
  }