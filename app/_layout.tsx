import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";

export default function RootLayout() {
  return (
    <>
      <Toast position="bottom" />

      <Provider store={store}>
        <Stack
          screenOptions={{
            headerShown: true,
            title: "📋 Todo",
            headerStyle: {
              backgroundColor: "transparent",
            },
            headerBackground: () => (
              <LinearGradient
                colors={["#4facfe", "#00f2fe"]}
                style={StyleSheet.absoluteFill}
              />
            ),
            headerTitleStyle: styles.headerTitle,
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            contentStyle: styles.content,
          }}
        />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 12,
    overflow: "hidden",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 24,
    letterSpacing: 1.2,
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  content: {
    backgroundColor: "#f6f8fb",
  },
});
