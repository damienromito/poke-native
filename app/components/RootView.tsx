import React, { useEffect } from 'react'
import { StyleSheet, ViewProps, ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useThemeColors } from '../hooks/useThemeColors'
import Animated, { Easing, interpolateColor, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

type Props = ViewProps & {
  style?: ViewStyle,
  backgroundColor?: string
}

const RootView = ({ style, backgroundColor, ...rest }: Props) => {
  const colors = useThemeColors()
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.primary, backgroundColor ?? colors.primary]
      ),
    };
  }, [backgroundColor]);



  useEffect(() => {
    if (backgroundColor) {
      progress.value = 0
      progress.value = withTiming(1, {
        duration: 1000,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System,
      })
    }
  }, [backgroundColor])

  if (!backgroundColor)
    return <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }, style]} {...rest} />


  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle, style]} >
      <SafeAreaView style={[styles.container]}  {...rest} />
    </Animated.View>

  )

}

export default RootView


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
})