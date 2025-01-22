

import React from 'react'
import { TextProps, Text, StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'
import { useThemeColors } from '../hooks/useThemeColors'


const styles = StyleSheet.create({
  body1: {
    fontSize: 14,
    lineHeight: 16
  },
  body2: {
    fontSize: 12,
    lineHeight: 16
  },
  body3: {
    fontSize: 10,
    lineHeight: 16
  },
  caption: {
    fontSize: 8,
    lineHeight: 12
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },

})

type Props = TextProps & {
  variant?: keyof typeof styles
  color?: keyof typeof Colors["light"]
}

export default function ThemeText({
  color = "grayDark",
  variant = "body3",
  style,
  ...rest
}: Props) {
  const colors = useThemeColors()
  return <Text {...rest} style={[{ color: colors[color] }, styles[variant], style]} />
}


