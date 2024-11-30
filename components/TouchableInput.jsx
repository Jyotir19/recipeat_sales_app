import { View, TouchableOpacity } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

export default function TouchableInput({ onPress, placeholder, value, inputStyle }) {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <View pointerEvents="none">
        <TextInput
          mode="outlined"
          outlineColor="#999"
          placeholder={placeholder}
          value={value}
          editable={false}
          style={{
            marginVertical: 10,
            backgroundColor: "#ECEFFF",
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
