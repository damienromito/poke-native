import { ViewStyle } from "react-native"
import Colors from "./Colors"

export const Shadows = {
  dp2: {
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
    elevation: 3
  }
} satisfies Record<string, ViewStyle>


export default {
  Shadows
} 