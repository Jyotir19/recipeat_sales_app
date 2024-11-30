import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
  Platform,
} from "react-native";
import { Icon, useTheme } from "react-native-paper";

export default function PressableButton({
  buttonText,
  btnStyles,
  btnTextStyles,
  onPress,
}) {
  const theme = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const shadowOffset = useRef(new Animated.Value(10)).current;
  const buttonPosition = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.parallel([
      Animated.timing(shadowOffset, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(buttonPosition, {
        toValue: 2,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);

    Animated.parallel([
      Animated.timing(shadowOffset, {
        toValue: 10,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(buttonPosition, {
        toValue: 0,
        duration: 150,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          {
            shadowColor: theme.colors.shadow,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: shadowOffset },
            shadowOpacity: isPressed ? 0.3 : 0.5,
            elevation: isPressed ? 1 : 2,
          },
        ]}
      >
        <Animated.View style={{ transform: [{ translateY: buttonPosition }] }}>
          <Pressable
            style={[
              styles.btn,
              { backgroundColor: theme.colors.primary },
              btnStyles,
            ]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text
              style={[
                styles.btnText,
                {
                  color: theme.colors.onPrimary,
                  borderColor: theme.colors.buttonBorderColor,
                },
                btnTextStyles,
              ]}
            >
              {buttonText}
            </Text>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginVertical: 18,
    borderRadius: 25,
    ...Platform.select({
      android: {
        elevation: 4,
      },
    }),
  },
  btnText: {
    fontSize: 18,
    fontWeight: 500,
    textAlign: "center",
  },
});
