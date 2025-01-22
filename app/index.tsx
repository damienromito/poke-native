import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from "react-native";
import Card from "./components/Card";
import PokemonCard from "./components/pokemon/PokemonCard";
import RootView from "./components/RootView";
import Row from "./components/Row";
import SearchBar from "./components/SearchBar";
import SortButton from "./components/SortButton";
import ThemeText from "./components/ThemeText";
import Icons from "./constants/Icons";
import { useInfiniteFetchQuery } from "./hooks/useFetchQuery";
import { useThemeColors } from "./hooks/useThemeColors";



export default function Index() {
  const colors = useThemeColors()
  const query = useInfiniteFetchQuery("/pokemon?limit=21")
  const { data, isFetching, fetchNextPage } = query
  const result = data?.pages?.flatMap((page) => page.results)
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<"id" | "name">("name")

  const pokemons = result?.map((item) => ({
    name: item.name,
    id: parseInt(item.url.split('/').at(-2)!, 10)
  })) || []
  const filtredPokemons = [...pokemons
    .filter(v => v.name.includes(search.toLowerCase()) || v.id.toString() === search.toString())]
    .sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1)

  return (
    <RootView>
      <View style={styles.header}>
        <Row gap={16}>
          <Image source={Icons.pokeball} style={styles.logo} tintColor={colors.white} />
          <ThemeText variant="headline" color="white">Pokédex</ThemeText>
        </Row>
        <Row gap={16}>
          <SearchBar value={search} onChange={(v) => setSearch(v)} />
          <SortButton value={sortKey} onChange={(v) => setSortKey(v)} />
        </Row>
      </View>
      <FlatList
        data={filtredPokemons}
        style={styles.list}
        numColumns={3}
        contentContainerStyle={{ gap: 8, paddingBottom: 20 }}
        columnWrapperStyle={{ gap: 8 }}
        renderItem={({ item }) => {
          return <PokemonCard id={item.id} name={item.name} style={{ flex: 1 / 3 }} />
        }}
        keyExtractor={item => item.id.toString()}
        ListFooterComponent={isFetching ? <ActivityIndicator color={colors.primary} /> : null}
        onEndReached={search ? undefined : () => fetchNextPage()}
      />
      {/* <Link style={{ color: "white" }} href="/about" >About</Link>
      <Link style={{ color: "white" }} href={{ pathname: "/pokemon/[id]", params: { id: "pikachu" } }} >Pikachu</Link> */}

      <Card />
      <StatusBar style="light" />
    </RootView >
  );
}


const styles = StyleSheet.create({

  header: {
    padding: 12,
    gap: 8,
    paddingBottom: 24
  },
  logo: {
    width: 24,
    height: 24
  },
  list: {
    backgroundColor: "#FFF",
    borderRadius: 4,
    padding: 16,
  }

})