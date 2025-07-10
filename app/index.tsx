import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";

import Todo from "@/components/Todo";
import TodoList from "@/components/TodoList";
import { TodoItem } from "@/types/todo";

export default function Index() {
  const [todos, setTodos] = React.useState<TodoItem[]>([]);

  const addTodo = (todo: TodoItem): void => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      title: todo.title,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>Your Today's Tasks!</Text>

            <FlatList
              data={todos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TodoList
                  todo={item}
                  deleteTodo={deleteTodo}
                  toggleTodo={toggleTodo}
                />
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
              keyboardShouldPersistTaps="handled"
            />

            <Todo addTodo={addTodo} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
    textAlign: "left",
    marginLeft: 20,
  },
});
