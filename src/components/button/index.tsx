import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  GestureResponderEvent,
} from 'react-native';

import iconFlag from '../assets/icon-flag.png';

export function Button({
  state,
  wordCorrect,
  onPressedCheck,
  onPressedNext,
  onPressedReset,
}: {
  state: string;
  wordCorrect: string;
  onPressedCheck: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressedNext: ((event: GestureResponderEvent) => void) | null | undefined;
  onPressedReset: ((event: GestureResponderEvent) => void) | null | undefined;
}) {
  var component = null;

  switch (state) {
    case 'correct':
      component = (
        <View style={styles.container}>
          <View style={[styles.content, styles.containerCorrect]}>
            <View style={styles.row}>
              <Text style={styles.title}>Great Job!</Text>
              <Image source={iconFlag} style={styles.icon} />
            </View>
            <Pressable onPress={onPressedNext} style={styles.button}>
              <Text style={[styles.text, styles.textCorrect]}>CONTINUE</Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    case 'incorrect':
      component = (
        <View style={styles.container}>
          <View style={[styles.content, styles.containerIncorrect]}>
            <View style={styles.row}>
              <Text style={styles.title}>Anwser: {wordCorrect}</Text>
              <Image source={iconFlag} style={styles.icon} />
            </View>
            <Pressable onPress={onPressedReset} style={styles.button}>
              <Text style={[styles.text, styles.textIncorrect]}>CONTINUE</Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    case 'check':
      component = (
        <View style={styles.container}>
          <View style={styles.content}>
            <Pressable
              onPress={onPressedCheck}
              style={[styles.button, styles.buttonCheck]}>
              <Text style={styles.text}>CHECK ANSWER</Text>
            </Pressable>
          </View>
        </View>
      );
      break;
    case 'disable':
      component = (
        <View style={styles.container}>
          <View style={styles.content}>
            <Pressable
              onPress={null}
              style={[styles.button, styles.buttonDisable]}>
              <Text style={styles.text}>CONTINUE</Text>
            </Pressable>
          </View>
        </View>
      );
      break;
  }
  return component;
}

export default Button;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: '10%',
    paddingHorizontal: '10%',
  },
  containerCorrect: {
    backgroundColor: '#00E0E8',
  },
  containerIncorrect: {
    backgroundColor: '#FE7A87',
  },
  buttonCheck: {
    backgroundColor: '#00E0E8',
  },
  buttonIncorrect: {
    backgroundColor: '#FE7A87',
  },
  buttonDisable: {
    backgroundColor: '#6392A6',
  },
  textCorrect: {
    color: '#00E0E8',
  },
  textIncorrect: {
    color: '#FE7A87',
  },
  icon: {
    width: 15,
    height: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    paddingBottom: '5%',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
