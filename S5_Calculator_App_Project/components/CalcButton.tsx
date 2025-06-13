import React, { FC } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  style: StyleProp<ViewStyle>;
  onPress?(): void;
}

const CalcButton: FC<Props> = ({ title, style, onPress }) => {
  return (
    <Pressable style={[styles.buttonWrapper, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default CalcButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontFamily: "Orbitron-Medium",
  },
});
