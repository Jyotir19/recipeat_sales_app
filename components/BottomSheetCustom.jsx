import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { Portal, useTheme } from "react-native-paper";
import { FullWindowOverlay } from "react-native-screens";

export default function BottomSheetCustom({
  children,
  isOpen,
  index,
  onDismiss,
  snapPointArray,
  style,
  handleStyle,
  handleIndicatorStyle,
  backgroundStyle,
}) {
  const theme = useTheme();
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(
    () => snapPointArray ?? ["25%", "50%", "75%", "80%"],
    []
  );

  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      onDismiss();
    }
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        onPress={onDismiss}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  const renderContainerComponent = useCallback(
    ({ children }) => <FullWindowOverlay>{children}</FullWindowOverlay>,
    []
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef?.current?.present();
    } else {
      bottomSheetRef?.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      enablePanDownToClose
      enableDismissOnClose
      ref={bottomSheetRef}
      index={index ?? 0}
      snapPoints={snapPoints}
      containerComponent={Portal}
      onDismiss={onDismiss}
      backdropComponent={renderBackdrop}
      onChange={handleSheetChanges}
      style={{
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        ...(style ?? {}),
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.onBackground,
        ...(handleIndicatorStyle ?? {}),
      }}
      handleStyle={{
        backgroundColor: theme.colors.inverseOnSurface,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        ...(handleStyle ?? {}),
      }}
      backgroundStyle={{
        backgroundColor: backgroundStyle ?? theme.colors.background,
      }}
    >
      {children}
    </BottomSheetModal>
  );
}