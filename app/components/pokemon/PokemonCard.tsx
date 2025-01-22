

import React from 'react'
import Card from '../Card'
import { Image, Pressable, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'
import ThemeText from '../ThemeText'
import { useThemeColors } from '@/app/hooks/useThemeColors'
import { Link } from 'expo-router'
import { getPokemonArtwork, getPokemonNumberFromId } from '@/app/helpers/pokemon'

type Props = {
  style?: ViewStyle
  id: number,
  name: string
}

export default function PokemonCard({
  style,
  id,
  name
}: Props) {

  const colors = useThemeColors()
  return (
    // <Link href={{ pathname: '/pokemon/[id]', params: { id: id } }} asChild>
    <Link href={`/pokemon/${id}`} asChild >
      {/* <Link href={'/pokemon'} asChild> */}

      <Pressable style={style}>
        <Card style={[styles.container]}>
          <ThemeText style={styles.id} variant='caption' color='grayMedium' >{getPokemonNumberFromId(id)}</ThemeText>
          <Image source={{ uri: getPokemonArtwork(id) }} style={styles.image} />
          <ThemeText variant='body3' color='grayDark' style={{ textTransform: "capitalize" }}>{name}</ThemeText>
          <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
        </Card>
      </Pressable>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
    padding: 4,
    flex: 1
  },
  image: {
    width: 72,
    height: 72
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    height: 44,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
  }
})