import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useThemeColors } from '../hooks/useThemeColors'
import Row from './Row'

type Props = {
  label: string,
  key: string,
  selected: boolean
  onSelected: (v: boolean) => void
}

const RadioButton = ({ label, selected, onSelected }: Props) => {
  // const [selected, setSelected] = useState(false)
  const colors = useThemeColors()

  // const select = () => {
  //   setSelected(!selected)
  //   onSelected(selected)
  // }

  return (
    <Pressable onPress={() => onSelected(!selected)}>
      <Row gap={8}>
        <View style={[styles.outerCircle, { borderColor: colors.primary }]}>
          {selected && <View style={[styles.innerCircle, { backgroundColor: colors.primary }]} />}
        </View>
        <Text>{label}</Text>
      </Row>
    </Pressable>
  )
}

export default RadioButton


const styles = StyleSheet.create({
  outerCircle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    borderStyle: "solid",
    borderWidth: 2,
    alignContent: "center",
    justifyContent: "center",
  },
  innerCircle: {
    width: 6,
    height: 6,
    borderRadius: 6,
    left: 3
  }
})