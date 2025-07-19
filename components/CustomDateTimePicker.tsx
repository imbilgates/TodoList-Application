import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onConfirm: (date: Date) => void;
  resetTrigger?: boolean;
}

const CustomDateTimePicker: React.FC<Props> = ({ onConfirm, resetTrigger }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const isDark = useColorScheme() === "dark";

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hidePicker();
    onConfirm(date); // Immediately pass selected date
  };

  // Reset selected date when resetTrigger changes
  useEffect(() => {
    if (resetTrigger) {
      setSelectedDate(null);
    }
  }, [resetTrigger]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={showPicker}>
        <Ionicons name="alarm-outline" size={20} color="#fff" />
        <Text style={styles.buttonText}>
          {selectedDate ? selectedDate.toLocaleString("en-IN") : "Set"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
        themeVariant={isDark ? "dark" : "light"}
        minimumDate={new Date()}
      />
    </View>
  );
};

export default CustomDateTimePicker;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    justifyContent: "center",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#10c033ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignItems: "center",
    gap: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 10,
    marginBottom: 22.
  },
});
