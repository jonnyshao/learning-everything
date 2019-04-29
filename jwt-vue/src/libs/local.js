export const setLocal = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(key, val)
}

export const getLocal = key => {
  return window.localStorage.getItem(key)
}
