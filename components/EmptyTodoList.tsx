import React from 'react';
import { View, Image, Text, StyleSheet, useColorScheme } from 'react-native';

const EmptyTodoList = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/image.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.text, { color: isDark ? '#aaa' : '#555' }]}>
        No tasks found
      </Text>
    </View>
  );
};

export default EmptyTodoList;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
    gap: 10,
  },
  image: {
    width: 120,
    height: 120,
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
