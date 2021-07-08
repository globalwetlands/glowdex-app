import chroma from 'chroma-js'

export const getBrewerColours = (scaleName = 'Set2', num = 5) => {
  return chroma.scale(scaleName).colors(num)
}

export const opacify = (col, alpha) => {
  return chroma(col).alpha(alpha)
}
