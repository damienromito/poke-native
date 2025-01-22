import { View, Text, ViewProps, StyleSheet } from 'react-native'
import React from 'react'
import Row from '../Row'
import ThemeText from '../ThemeText'
import { useThemeColors } from '@/app/hooks/useThemeColors'

type Props = ViewProps & {
  name: string
  value: number,
  color: string
}

const PokemonStat = ({
  name,
  value,
  color,
  style,
  ...rest
}: Props) => {
  const colors = useThemeColors()
  const shortname = name
    .replace("attack", 'atk')
    .replace("defense", 'def')
    .replace("-", '')
    .replace("special", 's')
    .replace("speed", 'SPD')
    .toUpperCase()
  return (
    <Row style={[styles.container, style]} gap={8} {...rest} >
      <ThemeText variant='subtitle3' style={[styles.name, { color, borderColor: colors.grayLight }]}>{shortname}</ThemeText>
      <ThemeText>{String(value).padStart(3, "0")}</ThemeText>
      <Row style={[styles.bar]} >
        <View style={[styles.barInner, { backgroundColor: color, flex: value }]} />
        <View style={[styles.barBackground, { backgroundColor: color, flex: 255 - value }]} />
      </Row>
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 16
  },
  name: {
    textTransform: "uppercase",
    borderRightWidth: 1,
    borderStyle: "solid",
    alignContent: "flex-end",
    width: 40,
    paddingRight: 8
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: 4,
    overflow: "hidden"
  },
  barInner: {
    height: 4,
    // position: "absolute"
  },
  barBackground: {
    height: 4,
    opacity: 0.3
  }
})

export default PokemonStat