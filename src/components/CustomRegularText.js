import { Text } from "react-native";

export default function CustomRegularText(props) {
  return <Text style={{ ...props.style, fontSize: 20, color: "#fff", fontFamily: "Montserrat" }}>{props.children}</Text>;
}
