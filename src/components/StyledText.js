import { Text } from "react-native";

export default function StyledText(props) {
  return <Text style={{ fontSize: props.size ? props.size : 20, color: "#fff", fontFamily: "Formula1-Regular", ...props.style }}>{props.children}</Text>;
}
