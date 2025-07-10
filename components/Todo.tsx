import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { TodoItem } from "@/types/todo";

interface TodoProps {
  addTodo: (todo: TodoItem) => void;
}

const Todo: React.FC<TodoProps> = ({ addTodo }) => {
  const [todo, setTodo] = React.useState<string>("");

  const handleAdd = () => {
    if (todo.trim()) {
      addTodo({
        id: Math.floor(Math.random() * 1000),
        title: todo,
        completed: false,
      });
      setTodo("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setTodo(text)}
        placeholder="Type your task..."
        value={todo}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity onPress={handleAdd}>
        <Text style={styles.addButton}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#007BFF",
    color: "white",
    borderRadius: 5,
    fontSize: 16,
  },
});
