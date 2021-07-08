import chroma from 'chroma-js'

export function getBrewerColors({ scaleName = 'Set2', alpha = 1 } = {}) {
  let scale = chroma.brewer?.[scaleName]

  if (alpha < 1) {
    scale = scale.map((color) => opacify({ color, alpha }))
  }

  return scale
}

export function opacify({ color, alpha }) {
  return chroma(color).alpha(alpha).css()
}
