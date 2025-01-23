import { getPokemonArtwork } from '@/app/helpers/pokemon'
import { Audio } from 'expo-av'
import React, { useEffect } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'

type Props = {
  pokemonId: string,
  cry?: string
}

const PokemonArtwork = ({ pokemonId, cry }: Props) => {

  const scaleArtworkValue = useSharedValue(1);
  const artworkAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleArtworkValue.value }],
    };
  }, [scaleArtworkValue]);



  const handleArtworkPressed = async () => {
    if (!cry) return
    scaleArtworkValue.value = 1
    scaleArtworkValue.value = withSpring(1.2, {}, () => {
      scaleArtworkValue.value = withSpring(1)
    })

    const { sound } = await Audio.Sound.createAsync({ uri: cry }, { shouldPlay: true });
    sound.playAsync()
  }
  return (
    <Pressable onPress={handleArtworkPressed}>
      <Animated.Image source={{ uri: getPokemonArtwork(Number(pokemonId)) }} style={[styles.artwork, artworkAnimatedStyles]} resizeMode="contain" />
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