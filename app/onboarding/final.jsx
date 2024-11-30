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
  parentCompany: yup.string().required("Parent Company is required"),
  totalOutlets: yup
    .number()
    .typeError("Total Outlets must be a number")
    .required("Total Outlets is required"),
  teamSize: yup
    .number()
    .typeError("Team Size must be a number")
    .required("Team Size is required"),
  currentCompany: yup.string().required("Current Company is required"),
});

export default function FourthStep() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resolver),
  });

  // const {
  //   updateParentCompany,
  //   updateTotalOutlets,
  //   updateTeamSize,
  //   updateCurrentCompany,
  // } = useOnboardingStore((state) => state);

  const handleClick = (data) => {
    // updateParentCompany(data.parentCompany);
    // updateTotalOutlets(data.totalOutlets);
    // updateTeamSize(data.teamSize);
    // updateCurrentCompany(data.currentCompany);

    router.push("/home");
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
          <Text>Parent Company</Text>
          <Controller
            name="parentCompany"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  placeholder="Enter Parent Company"
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
          <Text>Total Outlets</Text>
          <Controller
            name="totalOutlets"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter Total Outlets"
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
          <Text>Team Size</Text>
          <Controller
            name="teamSize"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter Team Size"
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
          <Text>Current Company</Text>
          <Controller
            name="currentCompany"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  placeholder="Enter Current Company"
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
    justifyContent: "space-between",
    backgroundColor: "#FBFBFB",
    marginTop: 30,
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
    gap: 10,
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
});
