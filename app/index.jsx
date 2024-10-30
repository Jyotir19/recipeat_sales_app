import { View, StyleSheet } from "react-native";
import { Text, HelperText, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";

import PressableButton from "@/components/PressableButton";

const resolver = yup.object().shape({
  phoneNumber: yup
    .string()
    .phone("IN", "Please enter a valid Indian phone number")
    .required("Phone number is required"),
});

export default function Index() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resolver),
  });

  const handleClick = () => {
    router.push("/onboarding");
  };

  return (
    <>
      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.headerText}>
          Log into your Reci
          <Text variant="displayMedium" style={styles.highlightText}>
            pay
          </Text>{" "}
          account
        </Text>

        <View style={styles.inputContainer}>
          <Text variant="titleLarge" style={styles.label}>
            Enter your phone number
          </Text>

          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={{ marginTop: 16 }}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  left={<TextInput.Affix text="+91" />}
                  keyboardType="number-pad"
                  autoFocus={true}
                />
                {error && (
                  <HelperText type="error" visible={!!error}>
                    {error.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <PressableButton
            onPress={handleSubmit(handleClick)}
            btnTextStyles={styles.buttonText}
            buttonText={"Continue"}
            btnStyles={styles.buttonBackground}
          />
        </View>
      </View>

      <View style={styles.termsContainer}>
        <Text variant="bodyMedium" style={styles.termsText}>
          By continuing you are agreeing to{"\n"}our terms and conditions
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 60,
  },
  headerText: {
    color: "#1B2559",
    textAlign: "center",
    fontWeight: "700",
  },
  highlightText: {
    color: "#4863E1",
    fontWeight: "700",
  },
  inputContainer: {
    width: "100%",
    marginVertical: 20,
  },
  label: {
    textAlign: "left",
  },
  input: {
    backgroundColor: "#ecefff",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  buttonBackground: {
    backgroundColor: "#4863E1",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "100%",
    marginVertical: 10,
  },
  termsContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  termsText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
