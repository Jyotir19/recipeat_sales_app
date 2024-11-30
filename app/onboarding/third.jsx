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
  PANNumber: yup.string().required("PAN Number is required"),
  accountNumber: yup.string().required("Account Number is required"),
  IFSC: yup.string().required("IFSC Code is required"),
  beneficiaryName: yup.string().required("Beneficiary Name is required"),
  bankName: yup.string().required("Bank Name is required"),
});

export default function FourthStep() {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(resolver),
  });

  const {
    updatePANNumber,
    updateAccountNumber,
    updateIFSC,
    updateBeneficiaryName,
    updateBankName,
  } = useOnboardingStore((state) => state);

  const handleClick = (data) => {

    updatePANNumber(data.PANNumber);
    updateAccountNumber(data.accountNumber);
    updateIFSC(data.IFSC);
    updateBeneficiaryName(data.beneficiaryName);
    updateBankName(data.bankName);
    
    router.push("./final");
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
          <Text>PAN Number</Text>
          <Controller
            name="PANNumber"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="default"
                  placeholder="Enter PAN Number"
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
          <Text>Account Number</Text>
          <Controller
            name="accountNumber"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="default"
                  placeholder="Enter account number"
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
          <Text>IFSC Code</Text>
          <Controller
            name="IFSC"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="default"
                  placeholder="Enter IFSC Code"
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
          <Text>Beneficiary Name</Text>
          <Controller
            name="beneficiaryName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="default"
                  placeholder="Enter beneficiary name"
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
          <Text>Bank Name</Text>
          <Controller
            name="bankName"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  value={value}
                  onChangeText={onChange}
                  error={!!error}
                  style={styles.input}
                  keyboardType="default"
                  placeholder="Enter bank name"
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
