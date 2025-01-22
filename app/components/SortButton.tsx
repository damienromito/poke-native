


import { View, Text, StyleSheet, Image, Modal, Pressable, LayoutChangeEvent, Dimensions } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useThemeColors } from '../hooks/useThemeColors'
import Icons from '../constants/Icons'
import { rgbaColor } from 'react-native-reanimated/lib/typescript/Colors'
import RadioButton from './RadioButton'
import Card from './Card'

type SelectedKey = "id" | "name"
type Props = {
  value: SelectedKey,
  onChange: (v: SelectedKey) => void
}


const SortButton = ({
  value,
  onChange
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 })
  const buttonRef = useRef<View>(null)
  const colors = useThemeColors()

  const options = [
    {
      value: "name",
      label: "Name"
    },
    {
      value: "id",
      label: "Number"
    },
  ]

  const showModal = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setModalPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width
      })
      setModalVisible(true)
    })
  }

  return (
    <>
      <Pressable onPress={showModal}>
        <View style={[styles.button, { backgroundColor: colors.white }]} ref={buttonRef}>
          <Image source={Icons.sort} style={styles.icon} tintColor={colors.primary} />
        </View>
      </Pressable>
      <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisible(false)} animationType='fade'>
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}></Pressable>
        <Card style={[styles.modal, { right: modalPosition.right, top: modalPosition.top }]}>
          {options.map(option => (
            <RadioButton
              label={option.label} key={option.value}
              selected={value == option.value}
              onSelected={(v) => onChange(option.value as SelectedKey)} />
          ))}
        </Card>
      </Modal>
    </>
  )
}

export default SortButton

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 16,
    height: 16
  },
  backdrop: {
    flex: 1,
    // position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  modal: {
    position: "absolute",
    padding: 16,
    gap: 16
  }
})