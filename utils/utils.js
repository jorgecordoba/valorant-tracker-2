export function composeDateQuery(from, to) {
    let fromQuery = ""
    let toQuery = ""      
    if (from) {
      fromQuery = `from=${from}`
    }
    if (to) {
      toQuery = `to=${to}`
    }
  
    let queryString = ""
    if (from && to) {
      queryString = `?${fromQuery}&${toQuery}`
    } 
    else if (from || to) {
      queryString = `?${fromQuery}${toQuery}`
    }  
    return queryString
  }