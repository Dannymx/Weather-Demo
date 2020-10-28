export const getFahrenheit = (kelvin) => {
  const temp = ((kelvin - 273.15) * 9) / 5 + 32
  return Math.round(temp)
}

export const getLocalTime = (dt, timezone) => {
  const offset = new Date().setSeconds(Math.abs(timezone))

  return new Date(offset).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}
