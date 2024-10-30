import { View, StyleSheet } from "react-native";
import { Text, IconButton, HelperText, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";
import PressableButton from "@/components/PressableButton";
import useOnboardingStore from "../../store/onboarding";

const resolver = yup.object().shape({
  emergencyContact: yup
    .string()
    .phone("IN", "Please enter a valid Indian phone number")
    .required("Emergency Contact is required"),
  currentAddress: yup.string().required("Current Address is required"),
  permanentAddress: yup.string().required("Permanent Address is required"),
});

export default function ThirdStep() {
  const router = useRouter();
  const {
    updateEmergencyContact,
    updateCurrentAddress,
    updatePermanentAddress,
  } = useOnboardingStore((state) => state);

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resolver),
  });

  const handleClick = (data) => {
    
    updateEmergencyContact(data.emergencyContact);
    updateCurrentAddress(data.currentAddress);
    updatePermanentAddress(data.permanentAddress);
    router.push("./third");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          size={24}
          style={styles.iconButton}
          onPress={() => router.push("/")}
        />
        <Text variant="headlineSmall" style={styles.headerText}>
          Onboarding
        </Text>
      </View>
      <View style={styles.formContainer}>
        <View>
          <Text>Emergency Contact Number</Text>
          <Controller
            name="emergencyContact"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="number-pad"
                  left={<TextInput.Affix text="+91" />}
                  placeholder="Enter emergency contact"
                />
                {error && (
                  <HelperText type="error" visible={!!error}>
                    {error.message}
                  </HelperText>
                )}
              </View>
            )}
          />
        </View>
        <View>
          <Text>Current Address</Text>
          <Controller
            name="currentAddress"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.multilineInput}
                  placeholder="Enter your current address"
                  multiline={true}
                  numberOfLines={4}
                />
                {error && (
                  <HelperText type="error" visible={!!error}>
                    {error.message}
                  </HelperText>
                )}
              </View>
            )}
          />
        </View>
        <View>
          <Text>Permanent Address</Text>
          <Controller
            name="permanentAddress"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.multilineInput}
                  placeholder="Enter your permanent address"
                  multiline={true}
                  numberOfLines={4}
                />
                {error && (
                  <HelperText type="error" visible={!!error}>
                    {error.message}
                  </HelperText>
                )}
              </View>
            )}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <PressableButton
          btnTextStyles={styles.buttonText}
          buttonText={"Next"}
          btnStyles={styles.buttonBackground}
          onPress={handleSubmit(handleClick)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBFBFB",
    marginTop: 30,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  iconButton: {
    alignSelf: "flex-start",
  },
  headerText: {
    fontWeight: "700",
    color: "#4863E1",
  },
  formContainer: {
    flex: 1,
    marginVertical: 30,
    padding: 20,
    gap: 15,
  },
  inputContainer: {
    marginTop: 10,
  },
  buttonContainer: {
    padding: 20,
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
  },
  input: {
    backgroundColor: "#ECEFFF",
  },
  multilineInput: {
    backgroundColor: "#ECEFFF",
    padding: 5,
  },
});
