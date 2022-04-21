import { Pokemon } from "./stores/main";

export const getPokemonBasic = (pokemon: { url: string; name: any }): Pokemon => {
  const array = pokemon?.url?.split('/')
  const id = Number(array[array.length - 2])
  return {
    id,
    name: pokemon?.name?.charAt(0).toUpperCase() + pokemon?.name?.slice(1)
  }
}