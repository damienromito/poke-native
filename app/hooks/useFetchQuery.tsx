import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { Colors } from "../constants/Colors";

const pokemonEndpoint = "https://pokeapi.co/api/v2"

const wait = async () => {
  return new Promise(resolve => {
    setTimeout(resolve, 1000)
  })
}

type API = {
  '/pokemon?limit=21': {
    count: number,
    next: string | null,
    results: { name: string, url: string }[]
  },
  "/pokemon/[id]": {
    abilities: {
      ability: {
        name: string
      }
    }[],
    cries: { latest: string },
    height: number,
    name: string,
    id: number,
    stats: {
      base_stat: number,
      stat: {
        name: string
      }
    }[],
    types: {
      slot: number,
      type: {
        name: keyof (typeof Colors)["type"]
      }
    }[],
    weight: number
  },
  "/pokemon-species/[id]": {
    flavor_text_entries: {
      flavor_text: string
    }[]
  }
}

export const useFetchQuery = <T extends keyof API>(path: T, params?: Record<string, string>) => {
  let pathWithParams: string = path
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      pathWithParams = path.replace(`[${key}]`, value)
    })
  }
  return useQuery({
    queryKey: [pathWithParams],
    queryFn: async () => {
      await wait()
      return fetch(pokemonEndpoint + pathWithParams)
        .then(r => r.json() as Promise<API[T]>)
    }
  })
}

export const useInfiniteFetchQuery = <T extends '/pokemon?limit=21'>(path: string) => {
  return useInfiniteQuery({
    queryKey: [path],
    initialPageParam: pokemonEndpoint + path,
    queryFn: async ({ pageParam }) => {
      await wait()
      return fetch(pageParam).then(r => r.json() as Promise<API[T]>)
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return null
      return lastPage.next as string
    }
  })
}

export default {}