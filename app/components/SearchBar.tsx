

import { View, Text, TextInput, Image, StyleSheet } from 'react-native'
import React from 'react'
import Icons from '../constants/Icons'
import { useThemeColor } from '@/app-example/hooks/useThemeColor'
import { useThemeColors } from '../hooks/useThemeColors'
import Row from './Row'

type Props = {
  value: string,
  onChange: (v: string) => void
}

const SearchBar = ({
  value,
  onChange
}: Props) => {
  const colors = useThemeColors()
  return (
    <Row style={[styles.container, { backgroundColor: colors.white }]}>
      <Image source={Icons.search} style={styles.image} tintColor={colors.primary} />
      <TextInput
        value={value}
        style={[styles.input, { color: colors.grayDark }]}
        placeholderTextColor={colors.grayMedium}
        placeholder='Search'
        onChangeText={(v) => onChange(v)}
      />
    </Row>
  )
}

export default SearchBar


const styles = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 12,
    flex: 1
  },
  image: {
    width: 16,
    height: 16,
  },
  input: {
    lineHeight: 16,
    // height: 16,
    fontSize: 10,
    flex: 1
  }
})