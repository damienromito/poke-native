import { StyleSheet, View } from "react-native"
import ThemeText from "../ThemeText"
import { Colors } from "@/app/constants/Colors"
import { useThemeColors } from "@/app/hooks/useThemeColors"

type Props = {
  type: keyof (typeof Colors)["type"]
}
const PokemonTypeBadge = ({ type }: Props) => {
  const color = useThemeColors()
  return <View style={[styles.container, { backgroundColor: Colors.type[type] || color.primary }]}>
    <ThemeText variant="subtitle3" color="white" style={{ textTransform: "capitalize" }} >{type}</ThemeText>
  </View>

}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  }
})


export default PokemonTypeBadge