import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  useColorScheme,
  Keyboard,
  Alert,
} from "react-native";
import { useAppDispatch } from "@/store/hooks";
import { addTodo } from "@/features/todoSlice";
import CustomDateTimePicker from "@/components/CustomDateTimePicker";
import { scheduleTodoNotification } from "@/utils/notifications";

const AddTodoForm = () => {
  const dispatch = useAppDispatch();
  const isDark = useColorScheme() === "dark";
  const [title, setTitle] = useState("");
  const [reminderAt, setReminderAt] = useState<Date | null>(null);
  const [resetDatePicker, setResetDatePicker] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Enter a todo title");
      return;
    }

    if (!reminderAt) {
      Alert.alert("Error", "Please set a reminder date");
      return;
    }

    const payload = { title, reminderAt };
    const result = await dispatch(addTodo(payload)).unwrap();

    await scheduleTodoNotification(result.title, new Date(result.reminderAt));
    setTitle("");
    setReminderAt(null);
    setResetDatePicker(true); // trigger reset
    Alert.alert("Success", "Todo added successfully");
    Keyboard.dismiss();

    // Immediately turn off reset trigger so it’s ready for next reset
    setTimeout(() => setResetDatePicker(false), 0);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? "#121212" : "#f8f9fa" },
      ]}
    >
      <View style={styles.row}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter your todo..."
          placeholderTextColor={isDark ? "#aaa" : "#888"}
          style={[
            styles.input,
            {
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              color: isDark ? "#fff" : "#000",
              flex: 1,
              marginRight: 8,
            },
          ]}
          returnKeyType="done"
        />

        <CustomDateTimePicker
          onConfirm={(date) => setReminderAt(date)}
          resetTrigger={resetDatePicker}
        />
      </View>

      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoForm;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ced4da",
  },
  addButton: {
    backgroundColor: "#0069d9",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
