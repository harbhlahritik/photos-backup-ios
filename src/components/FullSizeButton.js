import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import CustomRegularText from "./CustomRegularText";

export default function FullSizeButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} disabled={props.disabled} color="#fff" style={{ ...styles.button, backgroundColor: props.disabled ? "#555555" : "#5E5CE6", ...props.style }}>
      <CustomRegularText style={styles.text}>{props.children}</CustomRegularText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontFamily: "Montserrat",
    width: "96%",
    height: 64,
    backgroundColor: "#5E5CE6",
    color: "#ffffff",
    borderRadius: 8,
    justifyContent: "center",
    alignContent: "center",
  },
  text: {
    textAlign: "center",
  },
});
