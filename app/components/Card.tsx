import { StyleSheet, Text, View, ViewProps, ViewStyle } from "react-native";
import { useThemeColors } from "../hooks/useThemeColors";
import { Shadows } from "../constants/Shadows";

type Props = ViewProps

export default function Card({ style, children, ...rest }: Props) {
  const colors = useThemeColors()
  return (
    <View style={[styles, { backgroundColor: colors.white }, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = {
  borderRadius: 8,
  overflow: "hidden",
  ...Shadows.dp2
} satisfies ViewStyle