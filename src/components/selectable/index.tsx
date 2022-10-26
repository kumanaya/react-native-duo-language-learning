import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  GestureResponderEvent,
} from 'react-native';

const Selectable = ({
  onPressed,
  word,
  isPressed,
}: {
  onPressed: ((event: GestureResponderEvent) => void) | null | undefined;
  word: string;
  isPressed: boolean;
}) => {
  if (!isPressed) {
    return (
      <Pressable onPress={onPressed} style={styles.button}>
        <Text style={styles.text}>{word}</Text>
      </Pressable>
    );
  }
  return <View style={styles.buttonPressed} />;
};

export default Selectable;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#FFFFF',
    shadowOffset: {width: -2, height: 6},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonPressed: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 40,
    backgroundColor: '#6392A6',
    borderRadius: 15,
  },
  text: {
    color: '#2E4E5D',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
