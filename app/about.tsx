import { StyleSheet, Text, View } from "react-native";
import ThemeText from "./components/ThemeText";

export default function About() {
  return (
    <View>
      <ThemeText variant="headline" style={styles.title}>About</ThemeText>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "blue"
  }
})