import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { getPokemonArtwork } from '@/app/helpers/pokemon'
import { Audio } from 'expo-av'

type Props = {
  pokemonId: string,
  cry?: string
}

const PokemonArtwork = ({ pokemonId, cry }: Props) => {


  const handleArtworkPressed = async () => {
    if (!cry) return
    const { sound } = await Audio.Sound.createAsync({ uri: cry }, { shouldPlay: true });
    sound.playAsync()
  }
  return (
    <Pressable onPress={handleArtworkPressed}>
      <Image source={{ uri: getPokemonArtwork(Number(pokemonId)) }} style={[styles.artwork]} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  artwork: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
})

export default PokemonArtwork