import React, { useEffect, useState } from "react";
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
  StatusBar,
  useColorScheme,
} from "react-native";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import Todo from "@/components/Todo";
import TodoList from "@/components/TodoList";
import { fetchTodos } from "@/features/todoSlice";
import Loading from "@/components/Loading";
import EmptyTodoList from "@/components/EmptyTodoList";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function Index() {
  const dispatch = useAppDispatch();
  const { items: todos, loading } = useAppSelector((state: any) => state.todos);
  const theme = useColorScheme();
  const isDark = theme === "dark";
  const bgColor = isDark ? "#000" : "#fff";

  const [permission, setPermission] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        setPermission(finalStatus === "granted");
      } else {
        console.log("Must use a real device for notifications");
      }
    };
    requestPermission();
  }, []);

  React.useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={bgColor}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.heading, { color: isDark ? "#fff" : "#111" }]}
            ></Text>

            <FlatList
              data={todos}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => <TodoList todo={item} />}
              contentContainerStyle={{ paddingBottom: 100 }}
              keyboardShouldPersistTaps="handled"
              scrollEnabled
              ListEmptyComponent={loading ? <Loading /> : <EmptyTodoList />}
            />

            <Todo />
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
    textAlign: "left",
    marginLeft: 20,
  },
});
