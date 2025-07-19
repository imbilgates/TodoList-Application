import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteTodo, toggleTodo } from "@/features/todoSlice";
import { TodoItem } from "@/types/todo";
import { Ionicons } from "@expo/vector-icons";

interface TodoListProps {
  todo: TodoItem;
}

const TodoList: React.FC<TodoListProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const isDark = useColorScheme() === "dark";

  const isToggling = useAppSelector(
    (state) => state.todos.actionLoading.toggling[todo._id]
  );
  const isDeleting = useAppSelector(
    (state) => state.todos.actionLoading.deleting[todo._id]
  );

  const handleToggle = async () => {
    try {
      const updated = await dispatch(toggleTodo(todo)).unwrap();
      Alert.alert(
        "Success",
        updated.completed ? "Marked as complete" : "Marked as incomplete"
      );
    } catch {
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTodo(todo._id)).unwrap();
      Alert.alert("Success", "Todo deleted");
    } catch {
      Alert.alert("Error", "Failed to delete todo");
    }
  };

  const formatReminderDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#1e1e1e" : "#fff",
          shadowColor: isDark ? "#000" : "#ccc",
        },
      ]}
    >
      <View style={styles.todoContent}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            { backgroundColor: todo.completed ? "#28a745" : "#dee2e6" },
          ]}
          onPress={handleToggle}
          disabled={isToggling}
        >
          {isToggling ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons
              name={todo.completed ? "checkmark-done" : "ellipse-outline"}
              size={20}
              color={todo.completed ? "#fff" : "#495057"}
            />
          )}
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.todoText,
              {
                color: todo.completed ? "#adb5bd" : isDark ? "#fff" : "#212529",
                textDecorationLine: todo.completed ? "line-through" : "none",
              },
            ]}
          >
            {todo.title}
          </Text>
          <Text style={styles.reminderText}>
            ⏰ {formatReminderDate(todo.reminderAt)}
          </Text>
        </View>

        <TouchableOpacity onPress={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            <ActivityIndicator size="small" color="red" />
          ) : (
            <Ionicons name="trash-bin" size={20} color="red" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  toggleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  todoText: {
    fontSize: 16,
    fontWeight: "500",
  },
  reminderText: {
    fontSize: 12,
    color: "#868e96",
    marginTop: 4,
  },
});
