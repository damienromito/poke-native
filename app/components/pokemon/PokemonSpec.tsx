import { Image, ImageSourcePropType, StyleSheet, View, ViewProps, ViewStyle } from "react-native"
import Row from "../Row"
import ThemeText from "../ThemeText"
import { useThemeColors } from "@/app/hooks/useThemeColors"

type Props = ViewProps & {
  title: string,
  specName: string,
  icon?: ImageSourcePropType,
}
const PokemonSpec = ({
  title,
  specName,
  icon,
  style,
  ...rest
}: Props) => {
  const colors = useThemeColors()
  return (

    <View style={[styles.container, style]} {...rest}>
      <Row gap={8} style={styles.row}>
        {icon &&
          <Image source={icon} style={{ width: 16, height: 16 }} />
        }
        <ThemeText variant="body3" >{title}</ThemeText>
      </Row>
      <ThemeText variant="caption" style={{ color: colors.grayMedium }}>{specName}</ThemeText>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  row: {
    height: 32
  }
})

export default PokemonSpec