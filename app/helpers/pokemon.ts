
export const getPokemonNumberFromId = (id: number) => {
  return "#" + id.toString().padStart(3, "0")
}

export const getPokemonArtwork = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${String(id)}.png`
}


export default {}