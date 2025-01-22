
export const getPokemonNumberFromId = (id: number) => {
  return "#" + id.toString().padStart(3, "0")
}

export const getPokemonArtwork = (id: number) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${String(id)}.png`
}

export const pokemonDefaultStats = [
  { base_stat: 0, stat: { name: "HP" } },
  { base_stat: 0, stat: { name: "ATK" } },
  { base_stat: 0, stat: { name: "DEF" } },
  { base_stat: 0, stat: { name: "SATK" } },
  { base_stat: 0, stat: { name: "SDEF" } },
  { base_stat: 0, stat: { name: "SPD" } },
]

export default {}