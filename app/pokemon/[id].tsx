import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import PagerView, { PageScrollStateChangedNativeEvent } from "react-native-pager-view";
import Card from "../components/Card";
import PokemonArtwork from "../components/pokemon/PokemonArtwork";
import PokemonSpec from "../components/pokemon/PokemonSpec";
import PokemonStat from "../components/pokemon/PokemonStat";
import PokemonTypeBadge from "../components/pokemon/PokemonTypeBadge";
import RootView from "../components/RootView";
import Row from "../components/Row";
import ThemeText from "../components/ThemeText";
import { Colors } from "../constants/Colors";
import Icons from "../constants/Icons";
import { getPokemonNumberFromId, pokemonDefaultStats } from "../helpers/pokemon";
import { useFetchQuery } from "../hooks/useFetchQuery";
import { useThemeColors } from "../hooks/useThemeColors";


export default function Pokemon() {
  const params = useLocalSearchParams() as { id: string }
  const [id, setId] = useState(parseInt(params.id))
  const pager = useRef<PagerView>(null)
  const offset = useRef(0)

  const onPageSelected = (e: { nativeEvent: { position: number } }) => {
    offset.current = e.nativeEvent.position - 1
  }
  const onPageScrollStateChanged = (e: { nativeEvent: { pageScrollState: string } }) => {

    if (e.nativeEvent.pageScrollState !== "idle") return

    if (offset.current === -1 && id === 2) {
      return
    }
    if (offset.current === 1 && id === 150) {
      return
    }

    setId(id + offset.current)
  }
  const onNext = () => {
    pager.current?.setPage(2 + offset.current)
  }

  const onPrevious = () => {
    pager.current?.setPage(0)
  }

  return <PagerView
    style={{ flex: 1 }}
    onPageScrollStateChanged={onPageScrollStateChanged}
    initialPage={1}
    onPageSelected={onPageSelected}
    ref={pager}>
    <PokemonView key={id - 1} id={id - 1} onNext={onNext} onPrevious={onPrevious} />
    <PokemonView key={id} id={id} onNext={onNext} onPrevious={onPrevious} />
    <PokemonView key={id + 1} id={id + 1} onNext={onNext} onPrevious={onPrevious} />
  </PagerView>

}



type Props = {
  id: number,
  onNext: () => void,
  onPrevious: () => void,
}
const PokemonView = function ({
  id,
  onNext,
  onPrevious
}: Props) {
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: id.toString() })

  const { data: species } = useFetchQuery("/pokemon-species/[id]", { id: id.toString() })
  const description = species?.flavor_text_entries[0].flavor_text.replaceAll("\n", ". ") || ""

  const colors = useThemeColors()
  const mainType = pokemon?.types?.[0]?.type.name
  const mainColor = (mainType ? Colors.type[mainType] : colors.primary) || colors.primary

  const isFirst = id === 1
  const isLast = id === 151

  return (
    <RootView backgroundColor={mainColor}>
      <View>
        <Image source={require("@/assets/images/pokeball-bg.png")} style={styles.pokeballBg} />
        <Row style={[styles.topbar]} gap={8}>
          <Pressable onPress={router.back}>
            <Image source={Icons.arrowBack} tintColor={colors.white} style={[styles.backIcon]} />
          </Pressable>
          <ThemeText variant="headline" color="white" style={[styles.pokemonName]}>{pokemon?.name}</ThemeText>
          <ThemeText variant="subtitle2" color="white"  >{getPokemonNumberFromId(id)}</ThemeText>
        </Row>
        <View>

          <Row style={styles.header}>
            {isFirst
              ? <View style={styles.navArrow} />
              : <Pressable onPress={onPrevious}>
                <Image source={Icons.chevronLeft} style={styles.navArrow} tintColor={colors.white} />
              </Pressable>
            }
            <PokemonArtwork pokemonId={id.toString()} cry={pokemon?.cries.latest} />
            {isLast
              ? <View style={styles.navArrow} />
              : <Pressable onPress={onNext}>
                <Image source={Icons.chevronRight} style={styles.navArrow} tintColor={colors.white} />
              </Pressable>
            }

          </Row>

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
            <ThemeText style={styles.description}>{description}</ThemeText>
            <ThemeText variant="subtitle1" style={{ color: mainColor }}>Base Stats</ThemeText>
            <View style={styles.stats}>
              {(pokemon?.stats || pokemonDefaultStats).map((stat, index) => {
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

  topbar: {
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
  header: {
    position: "absolute",
    zIndex: 1,
    justifyContent: "space-between",
    width: "100%"
  },
  navArrow: {
    width: 24,
    height: 24,
    paddingHorizontal: 20
  },
  card: {
    padding: 20,
    marginTop: 150,
    paddingTop: 56,
    gap: 16,
    alignItems: "center",
  },
  description: {
    minHeight: 30
  },
  types: {
    gap: 16,
    height: 20
  },
  borderSpec: {
    borderRightWidth: 1,
  },
  stats: {
    alignSelf: "stretch"
  }
})