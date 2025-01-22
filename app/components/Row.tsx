import { View, Text, StyleSheet, ViewProps } from 'react-native'
import React from 'react'

type Props = ViewProps & {
  gap?: number,
}

const Row = ({
  style,
  ...rest
}: Props) => {
  return (
    <View style={[style, styles.container]} {...rest} />
  )
}

export default Row

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // flex: 0,
    alignItems: 'center'
  }
})