import { create } from "zustand";

const useOnboardingStore = create((set) => ({
  phoneNumber: "",
  name: "",
  jobTitle: "",
  email: "",
  gender: "",
  dateOfJoining: "",
  dateOfBirth: "",
  bloodType: "",
  aadharNumber: "",
  emergencyContact: "",
  currentAddress: "",
  permanentAddress: "",
  PANNumber: "",
  accountNumber: "",
  IFSC: "",
  beneficiaryName: "",
  bankName: "",

  updatePhoneNumber: (phoneNumber) => set(() => ({ phoneNumber: phoneNumber })),
  updateName: (name) => set(() => ({ name: name })),
  updateJobTitle: (jobTitle) => set(() => ({ jobTitle: jobTitle })),
  updateEmail: (email) => set(() => ({ email: email })),
  updateGender: (gender) => set(() => ({ gender: gender })),
  updateDateOfJoining: (dateOfJoining) =>
    set(() => ({ dateOfJoining: dateOfJoining })),
  updateDateOfBirth: (dateOfBirth) => set(() => ({ dateOfBirth: dateOfBirth })),
  updateBloodType: (bloodType) => set(() => ({ bloodType: bloodType })),
  updateAadharNumber: (aadharNumber) =>
    set(() => ({ aadharNumber: aadharNumber })),
  updateEmergencyContact: (emergencyContact) =>
    set(() => ({ emergencyContact: emergencyContact })),
  updateCurrentAddress: (currentAddress) =>
    set(() => ({ currentAddress: currentAddress })),
  updatePermanentAddress: (permanentAddress) =>
    set(() => ({ permanentAddress: permanentAddress })),
  updatePANNumber: (PANNumber) => set(() => ({ PANNumber: PANNumber })),
  updateAccountNumber: (accountNumber) =>
    set(() => ({ accountNumber: accountNumber })),
  updateIFSC: (IFSC) => set(() => ({ IFSC: IFSC })),
  updateBeneficiaryName: (beneficiaryName) =>
    set(() => ({ beneficiaryName: beneficiaryName })),
  updateBankName: (bankName) => set(() => ({ bankName: bankName })),
}));

export default useOnboardingStore;
