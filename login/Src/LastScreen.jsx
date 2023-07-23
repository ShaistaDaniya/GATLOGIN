import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LastScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Finally it's Done</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default LastScreen;
