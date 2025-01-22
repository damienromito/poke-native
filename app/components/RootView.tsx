import React from 'react'
import { StyleSheet, ViewProps, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColors } from '../hooks/useThemeColors'

type Props = ViewProps & {
  style?: ViewStyle,
}

const RootView = ({ style, ...rest }: Props) => {
  const colors = useThemeColors()
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }, style]} {...rest} />
  )
}

export default RootView


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
})