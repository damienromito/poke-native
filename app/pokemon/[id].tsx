import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Card from "../components/Card";
import PokemonSpec from "../components/pokemon/PokemonSpec";
import PokemonTypeBadge from "../components/pokemon/PokemonTypeBadge";
import RootView from "../components/RootView";
import Row from "../components/Row";
import ThemeText from "../components/ThemeText";
import { Colors } from "../constants/Colors";
import Icons from "../constants/Icons";
import { getPokemonArtwork, getPokemonNumberFromId } from "../helpers/pokemon";
import { useFetchQuery } from "../hooks/useFetchQuery";
import { useThemeColors } from "../hooks/useThemeColors";
import PokemonStat from "../components/pokemon/PokemonStat";
// import pokeballBgImage from "@/assets/images/pokeball-bg.png"


export default function Pokemon() {
  const { id } = useLocalSearchParams() as { id: string }
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id })
  const { data: species } = useFetchQuery("/pokemon-species/[id]", { id })
  const description = species?.flavor_text_entries[0].flavor_text.replaceAll("\n", ". ") || ""

  const colors = useThemeColors()
  const mainType = pokemon?.types?.[0]?.type.name
  const mainColor = (mainType ? Colors.type[mainType] : colors.primary) || colors.primary
  return (
    <RootView style={{ backgroundColor: mainColor }}>
      <View>
        <Image source={require("@/assets/images/pokeball-bg.png")} style={styles.pokeballBg} />
        <Row style={[styles.header]} gap={8}>
          <Pressable onPress={router.back}>
            <Image source={Icons.arrowBack} tintColor={colors.white} style={[styles.backIcon]} />
          </Pressable>
          <ThemeText variant="headline" color="white" style={[styles.pokemonName]}>{pokemon?.name}</ThemeText>
          <ThemeText variant="subtitle2" color="white"  >{getPokemonNumberFromId(Number(id))}</ThemeText>
        </Row>
        <View>
          <Image source={{ uri: getPokemonArtwork(Number(id)) }} style={[styles.artwork]} />
          <Card style={styles.card}>
            <Row style={styles.types}>
              {pokemon?.types.map((type, index) => {
                return <PokemonTypeBadge type={type.type.name} key={index} />
              })}
            </Row>
            <ThemeText variant="subtitle1" style={{ color: mainColor }}>About</ThemeText>
            <Row >
              <PokemonSpec icon={Icons.weight} title={`${pokemon?.weight} kg`} specName="Weight" style={{ borderRightColor: colors.grayLight, borderRightWidth: 1, borderStyle: "solid" }} />
              <PokemonSpec icon={Icons.height} title={`${pokemon?.height} m`} specName="Height" style={{ borderRightColor: colors.grayLight, borderRightWidth: 1, borderStyle: "solid" }} />
              <PokemonSpec title={pokemon?.abilities.map(a => a.ability.name).join("\n") || ""} specName="Moves" />
            </Row>
            <ThemeText>{description}</ThemeText>
            <ThemeText variant="subtitle1" style={{ color: mainColor }}>Base Stats</ThemeText>
            <View style={styles.stats}>
              {pokemon?.stats.map((stat, index) => {
                return <PokemonStat name={stat.stat.name} value={stat.base_stat} color={mainColor} key={index} />
              })}
            </View>
          </Card>
        </View>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({

  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: "center",
  },
  pokemonName: {
    textTransform: "capitalize",
    flex: 1
  },
  backIcon: {
    width: 32,
    height: 32,
  },
  pokeballBg: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  artwork: {
    width: 200,
    height: 200,
    position: "absolute",
    zIndex: 1,
    alignSelf: "center"
  },
  card: {
    padding: 20,
    marginTop: 150,
    paddingTop: 56,
    gap: 16,
    alignItems: "center",
  },
  types: {
    gap: 16
  },
  borderSpec: {
    borderRightWidth: 1,
  },
  stats: {
    alignSelf: "stretch"
  }
})