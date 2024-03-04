import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export default function CustomTextInput(props) {

  const [borderColor, setBorderColor] = useState("#555555");

  // useEffect(() => {
  //   if(props.error) {
  //     setBorderColor("#f72585");
  //   } else {
  //     setBorderColor("#555555");
  //   }
  // }, [props]);

  return (
    <TextInput 
      onChangeText={props.onChangeText ? props.onChangeText : null} 
      onFocus={() => setBorderColor("#5E5CE6")}
      onBlur={() => setBorderColor("#555555")}
      value={props.value ? props.value : ""}
      placeholder={props.placeholder ? props.placeholder : "useless placeholder"}
      keyboardType={props.keyboardType ? props.keyboardType : "numeric"}
      style={{ ...styles.input, ...props.style, borderColor: props.error ? "#f72585" : borderColor }}
    />
  );
}

const styles = new StyleSheet.create({
  input: {
    width: "96%",
    height: 64,
    color: "#fff",
    backgroundColor: "#212121",
    padding: 16,
    borderRadius: 4,
    borderWidth: 4,
    marginVertical: 10
  },
});
