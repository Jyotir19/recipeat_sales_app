import { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Text,
  IconButton,
  HelperText,
  TextInput,
  Button,
} from "react-native-paper";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone-lite";
import PressableButton from "../../components/PressableButton.jsx";
import useOnboardingStore from "../../store/onboarding";
import BottomSheetCustom from "../../components/BottomSheetCustom.jsx";
import TouchableInput from "../../components/TouchableInput.jsx";
import { GENDER } from "../../constants/constants.js";

const resolver = yup.object().shape({
  phoneNumber: yup
    .string()
    .phone("IN", "Please enter a valid Indian phone number")
    .required("Phone number is required"),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gender: yup.string().optional(),
});

export default function Index() {
  const [showGenderSheet, setShowGenderSheet] = useState(false);
  const {
    updatePhoneNumber,
    updateName,
    updateJobTitle,
    updateEmail,
    updateGender,
  } = useOnboardingStore((state) => state);

  const router = useRouter();

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(resolver),
  });

  const toggleGenderSheet = () => {
    setShowGenderSheet((prev) => !prev);
  };

  const handleGenderSelect = (gender) => {
    updateGender(gender);
    setValue("gender", gender);
    setShowGenderSheet(false);
  };

  const handleClick = (data) => {
    updatePhoneNumber(data.phoneNumber);
    updateName(data.name);
    updateJobTitle(data.jobTitle);
    updateEmail(data.email);
    updateGender(data.gender);
    router.push("./second");
  };

  console.log(showGenderSheet);

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
          <Text>Name</Text>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  placeholder="Enter Name"
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
          <Text>Phone Number</Text>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  left={<TextInput.Affix text="+91" />}
                  keyboardType="number-pad"
                  placeholder="Enter Phone Number"
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
          <Text>E-mail</Text>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="email-address"
                  placeholder="Enter Email Address"
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
          <Text>Gender</Text>
          <Controller
            name="gender"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View>
                <TouchableInput
                  value={value}
                  placeholder="Select Your Gender"
                  onPress={toggleGenderSheet}
                  inputStyle={styles.input}
                />
                {error && (
                  <HelperText type="error" visible={!!error}>
                    {error.message}
                  </HelperText>
                )}
              </View>
            )}
          />

          <BottomSheetCustom
            isOpen={showGenderSheet}
            index={2}
            onDismiss={() => setShowGenderSheet(false)}
          >
            {GENDER.map((gender) => (
              <Button
                key={gender}
                mode="contained"
                onPress={() => {
                  handleGenderSelect(gender);
                }}
                style={styles.genderButton}
              >
                <Text style={styles.genderButtonText}>{gender}</Text>
              </Button>
            ))}
          </BottomSheetCustom>
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
    justifyContent: "flex-start",
    gap: 20,
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
  genderButton: {
    marginVertical: 30,
    marginHorizontal: 10,
    padding: 5,
  },
  genderButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: 700,
  },
});
