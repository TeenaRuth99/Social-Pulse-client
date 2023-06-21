export const ValidateString = (value) => {
    if (/^[A-Za-z. ]+$/.test(value?.trim())) {
      return true
    }
  
    return false
  }
  export const ValidateDate = (value) => {
    const dob = new Date(value)
    const min = new Date(
      new Date().getFullYear() - 120,
      new Date().getMonth(),
      new Date().getDate()
    )
    const max = new Date()
  
    if (dob.getTime() >= min.getTime() && dob.getTime() <= max.getTime()) {
      return true
    }
  
    return false
  }
  
  export const isEqualTwoArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (!arr1[i].every((val, j) => val === arr2[i][j])) return false
    }
    return true
  }