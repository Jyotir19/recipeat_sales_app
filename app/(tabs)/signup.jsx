import { View, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, HelperText, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";

const resolver = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is required"),
  phoneNumber: yup
    .string()
    .phone("IN", "Please enter a valid Indian phone number")
    .required("Phone number is required"),
});

export default function SignupScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resolver),
  });

  const handleSignup = (data) => {
    console.log(data);
    router.push("/onboarding");
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.container}>
        <View>
          <Text variant="displayMedium" style={styles.headerText}>
            Sign up for
          </Text>
          <Text variant="displayMedium" style={styles.recipeatHeaderText}>
            Reci
            <Text variant="displayMedium" style={styles.highlightText}>
              peat
            </Text>
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text variant="titleLarge" style={styles.label}>
            Enter your details
          </Text>

          {/* Name Input */}
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  placeholder="Full Name"
                  autoCapitalize="words"
                />
                {error && (
                  <HelperText type="error" visible={!!error}>
                    {error.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          {/* Phone Number Input */}
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputWrapper}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  left={<TextInput.Affix text="+91" />}
                  keyboardType="number-pad"
                  placeholder="Phone Number"
                />
                {error && (
                  <HelperText type="error" visible={!!error}>
                    {error.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <TouchableOpacity
            style={styles.buttonBackground}
            onPress={handleSubmit(handleSignup)}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <Text variant="bodyMedium" style={styles.termsText}>
          By continuing, you agree to our {"\n"}terms and conditions
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
    gap: 100,
  },
  headerText: {
    color: "#1B2559",
    textAlign: "center",
    fontWeight: "700",
  },
  recipeatHeaderText: {
    color: "#1B2559",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 50,
  },
  highlightText: {
    color: "#4863E1",
    fontWeight: "700",
    fontSize: 50,
  },
  inputContainer: {
    width: "100%",
  },
  label: {
    textAlign: "left",
    marginBottom: 8,
  },
  inputWrapper: {
    marginTop: 16,
  },
  input: {
    backgroundColor: "#ecefff",
  },
  buttonBackground: {
    backgroundColor: "#4863E1",
    paddingVertical: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  termsContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  termsText: {
    textAlign: "center",
    color: "#7A7A7A",
    textDecorationLine: "underline",
  },
});
